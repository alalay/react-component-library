import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { spacing } from "../../utils";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LayoutHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.padding.small};
`;

const LayoutBody = styled.div`
  flex: 1;
`;

function ViewLayout(props) {
  const { bodyElement, header } = props;
  const { leftElement, middleElement, rightElement } = header;
  return (
    <LayoutContainer>
      <LayoutHeader>
        <div>{leftElement}</div>
        <div>{middleElement}</div>
        <div>{rightElement}</div>
      </LayoutHeader>
      <LayoutBody>{bodyElement}</LayoutBody>
    </LayoutContainer>
  );
}

ViewLayout.propTypes = {};

export default ViewLayout;
