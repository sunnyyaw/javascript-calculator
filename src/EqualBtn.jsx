import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { calculateFormula } from "./store/screenSlice";

export default function EqualBtn() {
  const [hovered,setHovered] = useState(false);
  const dispatch = useDispatch();
  const style = {
    gridArea: '4 / 4 / 6 / 4',
    backgroundColor: 'blue',
    color: hovered ? 'black' : 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    border: hovered ? '1px solid white' : '1px solid black',
  };
  return (
    <div id="equals" style={style} 
    onMouseOver={() => setHovered(true)} 
    onMouseOut={() => setHovered(false)}
    onClick={() => dispatch(calculateFormula())}>
      =
    </div>
  );
};