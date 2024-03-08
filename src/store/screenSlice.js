import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const highCalculate = (formula) => {
  const regex = /(-?\d+(?:\.\d+)?(?:e[\+\-]\d+)?)([x\/])(-?\d+(?:\.\d+)?(?:e[\+\-]\d+)?)/;
  const matches = formula.match(regex);
  if (!matches) {
    return formula;
  }
  const subFormula = matches[0];
  const num1 = matches[1];
  const operator = matches[2];
  const num2 = matches[3];
  switch(operator) 
  {
    case 'x':
      formula = formula.replace(subFormula,Number(num1) * Number(num2));
      return highCalculate(formula);
    case '/':
      formula = formula.replace(subFormula,Number(num1) / Number(num2));
      return highCalculate(formula);
    default:
      return formula;
  }
};
const lowCalculate = (formula) => {
  const regex = /(-?\d+(?:\.\d+)?(?:e[\+\-]\d+)?)([\+\-])(-?\d+(?:\.\d+)?(?:e[\+\-]\d+)?)/;
  const matches = formula.match(regex);
  if (!matches) {
    return formula;
  }
  const subFormula = matches[0];
  const num1 = matches[1];
  const operator = matches[2];
  const num2 = matches[3];
  switch(operator) 
  {
    case '+':
      formula = formula.replace(subFormula,Number(num1) + Number(num2));
      return lowCalculate(formula);
    case '-':
      formula = formula.replace(subFormula,Number(num1) - Number(num2));
      return lowCalculate(formula);
    default:
      return formula;
  }
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState: {
    screenText: '0',
    formulaText: '',
    tempScreenText: '0',
  },
  reducers: {
    changeScreenText: (state,action) => {
      const limitText = 'DIGIT LIMIT MET';
      const payload = action.payload;
      const screenText = state.screenText.slice();
      const formulaText = state.formulaText.slice();
      if ( formulaText.includes('=') && !/[x\+\-\/]$/.test(payload) 
      || screenText.includes('.') && payload === '.'
      || screenText === limitText && /[\d]$/.test(payload)) {

      } else if (screenText.length > 15  && /[\d]$/.test(payload)) {
        state.tempScreenText = screenText;
        state.screenText = limitText;
      } else if (/[x\+\-\/]/.test(screenText) && payload != '.'||
        /[x\+\-\/]/.test(payload) ||
        /^0$/.test(screenText) && payload !== '.' || screenText === limitText && payload === '.') {
        state.screenText = payload;
      } else if ((/[x\+\-\/]$/.test(screenText) || screenText === '' )
       && payload === '.') {
        state.screenText = '0.';
      } else{
        state.screenText += payload;
      }

      if ((screenText.length > 15 || screenText === limitText) && /[\d]$/.test(payload)
      || formulaText.includes('=') && !/[x\+\-\/]$/.test(payload)
      || screenText.includes('.') && payload === '.') {

      } else if (formulaText.includes('=') && /[x\+\-\/]$/.test(payload)) {
        state.formulaText = formulaText.split('=')[1] + payload;
      } else if ((/([x\+\-\/]$)/.test(formulaText) || formulaText === '' ) 
        && payload === '.') {
        state.formulaText += '0.';
      } else if (formulaText === '' || formulaText === '0' ) {
        state.formulaText = payload;
      } else if (!/[x\+\-\/]{2,}$/.test(formulaText) && /[x\+\-\/]$/.test(formulaText) && /[x\+\/]/.test(payload)) {
        state.formulaText = state.formulaText.slice(0,state.formulaText.length - 1).concat(payload);
      } else if (/[x\+\-\/]{2,}$/.test(formulaText) && /[x\+\-\/]/.test(payload)) {
        state.formulaText = state.formulaText.slice(0,state.formulaText.length - 2).concat(payload);
      } else if (formulaText.endsWith('.') && /([x\+\-\/])/.test(payload)) {
        state.formulaText = state.formulaText.slice(0,state.formulaText.length - screenText.length - 1).concat(payload);
      } else {
        state.formulaText += payload;
      }
    },
    calculateFormula: (state) => {
      const formulaText = state.formulaText.slice();
      const highResult = highCalculate(formulaText);
      const result = lowCalculate(highResult);
      if (!formulaText.includes('=')) {
        state.formulaText += ' = ' + result;
        state.screenText = result;
      }
    },
    clearScreenText: (state) => {
      state.screenText = '0';
      state.formulaText = '';
    },
    restoreText: (state) => {
      const limitText = 'DIGIT LIMIT MET';
      if (state.screenText ===  limitText) {
        state.screenText = state.tempScreenText;
      }
    },
  },
});

export const {changeScreenText,calculateFormula,clearScreenText,restoreText} = screenSlice.actions;

export default screenSlice.reducer;