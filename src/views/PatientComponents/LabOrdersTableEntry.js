import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';
import React from 'react';

export function LabOrdersTableEntry(props) {
  return (
    <NHSTr key={`orders${props.index}`}>
      <NHSTd key={`orders${props.index}request`}>{props.request}</NHSTd>
      <NHSTd key={`orders${props.index}timing`}>{props.timing}</NHSTd>
      <NHSTd key={`orders${props.index}context_time`}>{props.context_time}</NHSTd>
      <NHSTd key={`orders${props.index}composer`}>
        {props.composer}
        {' '}
      </NHSTd>
    </NHSTr>
  );
}

LabOrdersTableEntry.propTypes = {
  index: PropTypes.number,
  request: PropTypes.string,
  timing: PropTypes.string,
  context_time: PropTypes.string,
  composer: PropTypes.string,
};
