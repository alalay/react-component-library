import React from "react";
import { action } from "@storybook/addon-actions";

import { InputDatePicker } from "./index";

export default {
  title: "InputDatePicker",
  component: InputDatePicker
};

export const test = () => (
  <div>
    <InputDatePicker
      onChange={action("onChange", { depth: 5 })}
      onBlur={action("onBlur")}
    />
  </div>
);
