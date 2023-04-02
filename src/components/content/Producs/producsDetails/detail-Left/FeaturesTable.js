import React, { useState, useEffect } from 'react';

import styled from './FeaturesTable.module.css';
const FeaturesTable = ({ features }) => {
  const [featureTable, setFeatureTable] = useState([]);

  useEffect(() => {
    const featureTable = [];
    for (let key in features) {
      featureTable.push(
        <p className={styled.features} key={key}>
          {key} : {features[key]}
        </p>
      );
    }
    setFeatureTable(featureTable);
  }, [features]);

  return <div className={styled['features-container']}>{featureTable}</div>;
};

export default FeaturesTable;
