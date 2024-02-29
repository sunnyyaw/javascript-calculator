import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeScreenText} from "./store/screenSlice";

export default function Button({className, id, text, gridSpan = 1}) {
  const dispatch = useDispatch();
  const [hovered,setHovered] = useState(false);
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: hovered ? 'black' : 'white',
    gridColumn: `auto / span ${gridSpan}`,
    userSelect: 'none',
    border: hovered ? '1px solid white' :'1px solid black',
    borderRadius: '1px',
    backgroundColor: `${className}`,
  };
  const handleClick = () => dispatch(changeScreenText(text));
  const handleHover = () => setHovered(true);
  const handleOut = () => setHovered(false);
  return (
    <div id={id} style={buttonStyle} 
    onMouseOver={handleHover} 
    onMouseOut={handleOut}
    onClick={handleClick}>
      {text}
    </div>
  );
};