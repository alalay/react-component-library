import React, { Component } from "react";
import PropTypes from "prop-types";
import has from "lodash/has";

export default class DefaultValueRenderer extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    let stringValue;
    if (this.props.value === undefined || this.props.value === null) {
      stringValue = "";
    } else if (has(this.props.value, "bytes")) {
      stringValue = this.props.value.bytes;
    } else {
      stringValue = String(this.props.value);
    }
    // const formattedContent = hasWhiteSpace ? <FormatValue value={stringValue} /> : stringValue;
    const formattedContent = stringValue;

    return <div>{formattedContent}</div>;
  }
}
