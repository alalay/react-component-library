import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import head from "lodash/head";
import { TreeManager } from "../Managers";
import Component from "./ModelViewer.component";
import Leaf from "./Leaf";

/**
 * Return an array of the next items to display.
 * @param {object} item
 */
export function getChilds(item) {
  return (
    get(item, "type.items.fields") ||
    get(item, "type.fields") ||
    get(item, "type.symbols") ||
    get(item, "fields") ||
    get(item, "type")
  );
}
/**
 * Filtering the union removing the null value.
 * Return a new structure to represent the union.
 * @param {object} union
 */
export function filterNullUnion(union) {
  const typeWithoutNull = union.type
    .filter(type => type.type !== "null")
    .map(item => {
      if (!item.name) {
        return { ...item, name: union.name, path: union.path };
      }
      return item;
    });
  return {
    name: union.name,
    type:
      typeWithoutNull.length === 1 ? head(typeWithoutNull) : typeWithoutNull,
    optional: typeWithoutNull.length < union.type.length,
    path: union.path,
    "talend.component.label": union["talend.component.label"]
  };
}
/**
 * Make operation on union in the childs.
 * Return new array with the transformed union.
 * @param {array} childs
 */
export function transformUnions(childs) {
  return childs.reduce((acc, child) => {
    if (Array.isArray(child.type)) {
      acc.push(filterNullUnion(child));
    } else {
      acc.push(child);
    }
    return acc;
  }, []);
}
/**
 * Return the array of childs, used in the branch.
 * @param {object} item
 */
export function defaultTransformChilds(item) {
  const childs = getChilds(item);
  return transformUnions(childs).map(field => ({
    dataKey: field.name,
    value: field
  }));
}
class ModelViewer extends React.Component {
  static defaultProps = {
    getChilds: defaultTransformChilds
  };
  renderLeaf = args => <Leaf {...args} {...this.props} />;
  renderComponent = args => {
    const componentProps = {
      ...this.props,
      leaf: this.renderLeaf,
      value: this.props.getChilds(this.props.sample.schema)
    };
    return <Component {...args} {...componentProps} />;
  };
  render() {
    return <TreeManager wrappedComponent={this.renderComponent} />;
  }
}

export default ModelViewer;
