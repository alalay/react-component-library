import React from "react";
import styled from "styled-components";
import omit from "lodash/omit";
import { applyStyleModifiers } from "styled-components-modifiers";

import Icon from "../Icon";
import { defaultTheme, typeScale } from "../../utils";

export const BUTTON_MODIFIERS = {
  small: () => `
  font-size: ${typeScale.helperText};
  padding: 8px;
  `,
  large: () => `
  padding: 16px 24px;
  font-size: ${typeScale.header5};
  `
};

const Button = styled.button`
  border: none;
  padding: 12px 24px;
  font-size: ${typeScale.paragraph};
  border-radius: 2px;
  font-family: ${defaultTheme.primaryFont};
  cursor: pointer;
  transition: background-color 0.2s linear, color 0.2s linear;
  text-transform: uppercase;

  &:hover {
    background-color: ${defaultTheme.primaryHoverColor};
    color: ${defaultTheme.textColorOnPrimary};
  }

  &:focus {
    outline: 3px solid ${defaultTheme.primaryHoverColor};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${defaultTheme.primaryActiveColor};
    border-color: ${defaultTheme.primaryActiveColor};
    color: ${defaultTheme.textColorOnPrimary};
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${defaultTheme.primaryColor};
  color: ${defaultTheme.textColorOnPrimary};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${defaultTheme.primaryColor};
  border: solid 2px ${defaultTheme.primaryColor};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;
const TertiaryButton = styled(Button)`
  background-color: transparent;
  color: ${defaultTheme.primaryColor};
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`;

const IconWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  > svg {
    height: 12px;
  }
`;
function TertiaryIconButton(props) {
  return (
    <TertiaryButton {...omit(props, "children")} modifiers={["small"]}>
      {props.icon ? (
        <IconWrapper>
          <Icon icon={props.icon} />
        </IconWrapper>
      ) : null}
      {props.children}
    </TertiaryButton>
  );
}

export { PrimaryButton, SecondaryButton, TertiaryButton, TertiaryIconButton };
