import { css } from "styled-components";
import { defaultTheme } from "../../utils";

export const pickerAction = props => css`
  font-size: 1.2rem;
  ${props.isSelected &&
    css`
      background-color: ${defaultTheme.primaryColor};
      color: ${defaultTheme.textColorInverted};
      transition: color 0.2s ease-in;
      font-weight: 600;
    `}
`;
