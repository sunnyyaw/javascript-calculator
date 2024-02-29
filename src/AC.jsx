import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearScreenText } from './store/screenSlice';

export default function AC() {
  const dispatch = useDispatch();
  const [hovered,setHovered] = useState(false);
  const style = {
    backgroundColor: 'red',
    gridArea: '1 / 1 / 1 / 3',
    color: hovered ? 'black' : 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    border: hovered ? '1px solid white' : '1px solid black',
  };
  return (
    <div id="clear" style={style} 
    onMouseOver={() => setHovered(true)} 
    onMouseOut={() => setHovered(false)}
    onClick={() => dispatch(clearScreenText())}>
      AC
    </div>
  );
}