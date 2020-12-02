import React from "react";
import PropTypes from "prop-types";
import TreeNode from "../TreeNode";
import TreeNodeList from "../TreeNodeList";

function Tree({ noRoot, ...props }) {
  if (noRoot) {
    return <TreeNodeList {...props} />;
  }
  return <TreeNode {...props} />;
}

Tree.propTypes = {};

export default Tree;
