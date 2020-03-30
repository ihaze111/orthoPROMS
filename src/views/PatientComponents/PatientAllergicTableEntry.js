import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';
import React from 'react';

export function PatientAllergicTableEntry(props) {
  return (
    <NHSTr key={`allergies${props.index}`}>
      <NHSTd key={`allergies${props.index}cause`}>{props.cause}</NHSTd>
      <NHSTd key={`allergies${props.index}comment`}>
        {props.comment}
        {' '}
        {props.exclusion}
      </NHSTd>
      <NHSTd key={`allergies${props.index}reaction`}>{props.reaction}</NHSTd>
      <NHSTd key={`allergies${props.index}update_exclusion_date`}>
        {props.update_exclusion_date}
        {' '}
      </NHSTd>
      <NHSTd key={`allergies${props.index}composer`}>{props.composer}</NHSTd>
    </NHSTr>
  );
}

PatientAllergicTableEntry.propTypes = {
  index: PropTypes.number,
  cause: PropTypes.string,
  comment: PropTypes.string,
  exclusion: PropTypes.string,
  reaction: PropTypes.string,
  update_exclusion_date: PropTypes.string,
  composer: PropTypes.string,
};
