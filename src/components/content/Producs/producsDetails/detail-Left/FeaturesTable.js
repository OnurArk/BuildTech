import styled from './FeaturesTable.module.css';

const FeaturesTable = ({ features }) => {
  const featureTable = features.map(([key, value]) => (
    <p className={styled.features} key={key}>
      {key} : {value}
    </p>
  ));

  return <div className={styled['features-container']}>{featureTable}</div>;
};

export default FeaturesTable;
