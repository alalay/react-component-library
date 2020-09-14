import React from "react";
import DropdownButton from "../DropdownButton";

export default {
  title: "DropdownButton",
  component: DropdownButton
};

export const example = () => (
  <div>
    <DropdownButton title="Click Me!">
      <div>I am a dropdown</div>
    </DropdownButton>
  </div>
);
