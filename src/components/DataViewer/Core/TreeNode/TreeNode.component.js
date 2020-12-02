import React from "react";
import PropTypes from "prop-types";

class TreeNode extends React.Component {
  render() {
    return this.props.leaf({ ...this.props });
  }
}

export default TreeNode;
