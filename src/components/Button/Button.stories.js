import React from "react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "./index";

export default {
  title: "Button",
  component: PrimaryButton,
};

export const test = () => (
  <div>
    <div>
      <p>Primary Button</p>
      <div>
        <PrimaryButton>Hello World</PrimaryButton>
      </div>
    </div>
	<div>
      <p>Secondary Button</p>
      <div>
        <SecondaryButton>Hello World</SecondaryButton>
      </div>
    </div>
	<div>
      <p>Tertiary Button</p>
      <div>
        <TertiaryButton>Hello World</TertiaryButton>
      </div>
    </div>
  </div>
);
