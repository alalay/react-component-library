import React from "react";
import PropTypes from "prop-types";
import TreeNode from "../TreeNode";

function TreeNodeList(props) {
  return (
    <ul>
      {props.value.map((node, index) => (
        <li key={index}>
          <TreeNode {...props} {...node} />
        </li>
      ))}
    </ul>
  );
}

TreeNodeList.propTypes = {};

export default TreeNodeList;
