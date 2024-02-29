import React from 'react';

import ScreenPad from './ScreenPad';
import Buttons from './Buttons';

import './App.css';

export default function App() {
  return (
    <>
      <div id="calculator">
        <ScreenPad />
        <Buttons />
      </div>
      <footer id="author">
        <p>Designed and Coded By</p>
        <a href="#">ZhengYang Qiu</a>
      </footer>
    </>
  );
}