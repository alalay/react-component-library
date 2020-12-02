import React from "react";
import ModelViewer from "./ModelViewer";
import hierarchicSample from "./sample.raw.json";
import { get } from "http";

export default {
  title: "ModelViewer",
  component: ModelViewer
};

export const example = () => {
  const getDisplayValue = item =>
    typeof item === "string" ? item : get(item, "doc", item.name);
  return (
    <div>
      <ModelViewer
        sample={hierarchicSample}
        getDisplayValue={getDisplayValue}
      />
    </div>
  );
};
