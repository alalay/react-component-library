import { css } from "styled-components";
import { defaultTheme } from "../../utils";

export const selectedStyle = props =>
  props.isSelected &&
  css`
    background-color: ${defaultTheme.primaryColor};
    color: ${defaultTheme.textColorInverted};
  `;
