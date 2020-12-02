import React from "react";
import PropTypes from "prop-types";
import SimpleTextKeyValue from "../../Text/SimpleTextKeyValue";

function ModelViewerLeaf({value, getDisplayValue, ...props}) {
  const formattedKey = getDisplayValue(value);
  return (
    <span>
      <button />
      <SimpleTextKeyValue
        formattedKey={formattedKey}
      />
    </span>
  );
}

ModelViewerLeaf.propTypes = {};

export default ModelViewerLeaf;
