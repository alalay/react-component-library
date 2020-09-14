import React from "react";
import { Dropdown, useDropdownToggle, useDropdownMenu } from "react-overlays";
import styled, { css } from "styled-components";
import { TertiaryButton } from "../Button";

const DropdownContainer = styled.div`
  position: relative;
`;
const DropdownMenu = styled.div`
  margin: 0;
  padding: 10px 0;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.175);
  background-color: white;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: none;
  opacity: 0;
  transform: translateY(-15px);
  transition: opacity 0.15s cubic-bezier(0, 0, 0.2, 1),
    transform 0.15s cubic-bezier(0, 0, 0.2, 1), visibility 0s;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;

  ${props =>
    props.open &&
    css`
      display: block;
      opacity: 1;
      transform: translateY(0);
    `}
`;
function Menu({ children }) {
  const { show, close, props } = useDropdownMenu();
  console.log(props);
  return (
    <DropdownMenu {...props} open={show} onClick={close}>
      {children}
    </DropdownMenu>
  );
}
function Toggle({ children }) {
  const [props, { toggle }] = useDropdownToggle();
  return (
    <TertiaryButton
      type="button"
      modifiers={["small"]}
      {...props}
      onClick={toggle}
    >
      {children}
    </TertiaryButton>
  );
}

function DropdownButton({ title, children }) {
  return (
    <Dropdown>
      {({ props }) => (
        <DropdownContainer {...props}>
          <Toggle>{title}</Toggle>
          <Menu>{children}</Menu>
        </DropdownContainer>
      )}
    </Dropdown>
  );
}

export default DropdownButton;
