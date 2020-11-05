import React from "react";
import InputDatePicker from "./InputDatePicker";
import { action } from "@storybook/addon-actions";

export default {
  title: "InputDatePicker",
  component: InputDatePicker
};

export const example = () => <InputDatePicker onChange={action("onChange")} />;
