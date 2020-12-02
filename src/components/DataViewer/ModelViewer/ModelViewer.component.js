import React from "react";
import PropTypes from "prop-types";
import Tree from "../Core/Tree";

function ModelViewer(props) {
  return (
    <Tree {...props} noRoot />
  );
}

ModelViewer.propTypes = {};

export default ModelViewer;
