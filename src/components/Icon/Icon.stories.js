import React from "react";
import { Icon } from "./index";
import styled from "styled-components";
import { icons } from "../shared/icons";

export default {
  title: "Icon",
  component: Icon
};

const Meta = styled.div`
  color: #666;
  font-size: 12px;
`;
const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
`;
const Item = styled.li`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 20%;
  min-width: 120px;
  padding: 0px 7.5px 20px;
  svg {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
`;
export const labels = () => (
  <>
    There are {Object.keys(icons).length} icons
    <List>
      {Object.keys(icons).map(key => (
        <Item key={key}>
          <Icon icon={key} />
          <Meta>{key}</Meta>
        </Item>
      ))}
    </List>
  </>
);
