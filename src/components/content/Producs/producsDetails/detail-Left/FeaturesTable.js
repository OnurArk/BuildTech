import React, { useState, useEffect } from "react";

import styled from "./FeaturesTable.module.css";
const FeaturesTable = ({ item }) => {
  const [featureTable, setFeatureTable] = useState([]);

  useEffect(() => {
    const featureTable = [];
    for (let key in item?.features) {
      featureTable.push(
        <p className={styled.features} key={key}>
          {key} : {item.features[key]}
        </p>
      );
    }
    setFeatureTable(featureTable);
  }, [item]);

  return <div className={styled["features-container"]}>{featureTable}</div>;
};

export default FeaturesTable;
