import React from 'react';
import * as PropTypes from 'prop-types';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';

export default function LabReportsTableEntry(props) {
  return (
    <NHSTr key={`reports${props.index}`}>
      <NHSTd key={`reports${props.index}test`}>{props.test}</NHSTd>
      <NHSTd key={`reports${props.index}comment`}>{props.comment}</NHSTd>
      <NHSTd key={`reports${props.index}conclusion`}>{props.conclusion}</NHSTd>
      <NHSTd key={`reports${props.index}test_timestamp`}>
        {props.test_timestamp}
        {' '}
      </NHSTd>
      <NHSTd key={`reports${props.index}composer`}>
        {props.composer}
        {' '}
      </NHSTd>
    </NHSTr>
  );
}

LabReportsTableEntry.propTypes = {
  index: PropTypes.number,
  test: PropTypes.string,
  comment: PropTypes.string,
  conclusion: PropTypes.string,
  test_timestamp: PropTypes.string,
  composer: PropTypes.string,
};
