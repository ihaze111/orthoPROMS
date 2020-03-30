import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';
import React from 'react';

export function PatientProgressTableEntry(props) {
  // TODO: what happens if no NHS number?
  return (
    <NHSTr key={`composition${props.nhs_number}no${props.index}`}>
      <NHSTd key={`composition${props.nhs_number}no${props.index}index`}>
        <a
          href={`/Composition?compId=${props.comp_id}`}
        >
          {props.index + 1}
        </a>
      </NHSTd>
      <NHSTd key={`composition${props.nhs_number}no${props.index}nhsNumber`}>{props.nhs_number}</NHSTd>
      <NHSTd
        key={`composition${props.nhs_number}no${props.index}composerName`}
      >
        {props.composer_name}
      </NHSTd>
      <NHSTd
        key={`composition${props.nhs_number}no${props.index}episodeIdentifier`}
      >
        {props.episode_identifier}
      </NHSTd>
      <NHSTd
        key={`composition${props.nhs_number}no${props.index}aofasComment`}
      >
        {props.aofas_comment}
      </NHSTd>
    </NHSTr>
  );
}

PatientProgressTableEntry.propTypes = {
  nhs_number: PropTypes.string,
  index: PropTypes.number,
  comp_id: PropTypes.string,
  composer_name: PropTypes.string,
  episode_identifier: PropTypes.string,
  aofas_comment: PropTypes.string,
};
