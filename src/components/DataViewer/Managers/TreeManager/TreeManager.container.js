import React from "react";

export default class TreeManager extends React.Component {
  render() {
    const wrappedProps = {};
    return this.props.wrappedComponent({ ...wrappedProps });
  }
}
