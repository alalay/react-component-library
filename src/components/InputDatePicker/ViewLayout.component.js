import React from "react";
import styled from "styled-components";
import { spacing } from "../../utils";

const ViewLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ViewLayoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.padding.small};
`;
const ViewLayoutBody = styled.div`
  flex: 1;
`;

function ViewLayout(props) {
  const { header, bodyElement } = props;
  const { leftElement, middleElement, rightElement } = header;
  return (
    <ViewLayoutContainer>
      <ViewLayoutHeader>
        <div>{leftElement}</div>
        <div>{middleElement}</div>
        <div>{rightElement}</div>
      </ViewLayoutHeader>
      <ViewLayoutBody>{bodyElement}</ViewLayoutBody>
    </ViewLayoutContainer>
  );
}

export default ViewLayout;
