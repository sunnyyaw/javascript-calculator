import React from "react";
import AC from './AC';
import Button from './Button';
import EqualBtn from "./EqualBtn";

import './Buttons.css';

export default function Buttons() {
  return (
    <div id="buttons">
      <AC />
      <Button className="gray" id="divide" text="/"/>
      <Button className="gray" id="multiply" text="x"/>
      <Button className="dimGray" id="seven" text="7"/>
      <Button className="dimGray" id="eight" text="8"/>
      <Button className="dimGray" id="nine" text="9"/>
      <Button className="gray" id="subtract" text="-"/>
      <Button className="dimGray" id="four" text="4"/>
      <Button className="dimGray" id="five" text="5"/>
      <Button className="dimGray" id="six" text="6"/>
      <Button className="gray" id="add" text="+"/>
      <Button className="dimGray" id="one" text="1"/>
      <Button className="dimGray" id="two" text="2"/>
      <Button className="dimGray" id="three" text="3"/>
      <Button className="dimGray" id="zero" text="0" gridSpan="2"/>
      <Button className="dimGray" id="decimal" text="."/>
      <EqualBtn className="blue"/>
    </div>
  );
}