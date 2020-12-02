import React from "react";
import PropTypes from "prop-types";
import DefaultValueRenderer from "./DefaultValueRenderer.component";

const LONG_TYPE = "long";
const TIMESTAMP_MILLIS_LOGICAL_TYPES = "timestamp-millis";
const DATE_TYPE_FORMATER = "date";
const PRIMITIVES_MAPPING = {
  double: "int",
  float: "int",
  int: "int",
  long: "int"
};

function getTypeRenderer(schemaType) {
  if (!schemaType) return "";
  if (
    schemaType.type === LONG_TYPE &&
    schemaType.logicalType === TIMESTAMP_MILLIS_LOGICAL_TYPES
  ) {
    return DATE_TYPE_FORMATER;
  }
  if (PRIMITIVES_MAPPING[schemaType.type]) {
    return PRIMITIVES_MAPPING[schemaType.type];
  }

  return schemaType.type;
}

function AvroRenderer({ colDef }) {
  const typeRenderer = getTypeRenderer(colDef.avro.type);
  switch (typeRenderer) {
    case "DefaultInt":
    case "number":
      return <DefaultValueRenderer />;

      break;

    default:
      break;
  }
}

function SimpleTextKeyValue({ schema, value }) {
  return (
    schema &&
    value && (
      <AvroRenderer
        data={value}
        colDef={{
          avro: typeof schema.type === "string" ? { type: schema } : schema
        }}
      />
    )
  );
}

SimpleTextKeyValue.propTypes = {};

export default SimpleTextKeyValue;
