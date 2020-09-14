import React from "react";

import { GlobalStyle } from "../src/utils/global";

// Global decorator to apply the styles to all stories
export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  )
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};
