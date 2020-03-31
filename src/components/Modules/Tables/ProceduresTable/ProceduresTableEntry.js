import React from 'react';
import * as PropTypes from 'prop-types';
import { NHSTd, NHSTr } from '../../../react-styled-nhs/src/NHSTableWrapperTest';

export default function ProceduresTableEntry(props) {
  return (
    <NHSTr key={`procedures${props.index}`}>
      <NHSTd key={`procedures${props.index}procedure_name`}>{props.procedure_name}</NHSTd>
      <NHSTd key={`procedures${props.index}notes`}>{props.notes}</NHSTd>
      <NHSTd key={`procedures${props.index}careflow_step`}>{props.careflow_step}</NHSTd>
      <NHSTd key={`procedures${props.index}time`}>
        {props.time}
        {' '}
      </NHSTd>
      <NHSTd key={`procedures${props.index}name`}>{props.name}</NHSTd>
    </NHSTr>
  );
}

ProceduresTableEntry.propTypes = {
  index: PropTypes.number,
  procedure_name: PropTypes.string,
  notes: PropTypes.string,
  careflow_step: PropTypes.string,
  time: PropTypes.string,
  name: PropTypes.string,
};
