import React from 'react';
import { useSelector } from 'react-redux';

import './ScreenPad.css';

export default function ScreenPad() {
  const screenText = useSelector(state => state.screen.screenText);
  const formulaText = useSelector(state => state.screen.formulaText);
  return (
    <>
      <div id="display-box">
        <div id="formula">{formulaText}</div>
        <div id="display">{screenText}</div>
      </div>
    </>
  );
};