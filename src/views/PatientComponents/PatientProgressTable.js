import {
  NHSTable,
  NHSTableWrapper,
  NHSTBody,
  NHSTh,
  NHSTHead,
  NHSTr
} from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import { Compositions } from './CompositionList';
import * as PropTypes from 'prop-types';
import React from 'react';

export function PatientProgressTable(props) {
  if (props.ehrId) {
    return (
      <NHSTableWrapper>
        <NHSTable>
          <NHSTHead>
            <NHSTr key={`compositionNHS Numberno${props.index}`}>
              <NHSTh key={`compositionNHS Numberno${props.index}index`}>#</NHSTh>
              <NHSTh key={`compositionNHS Numberno${props.index}nhsNumber`}>NHS Number</NHSTh>
              <NHSTh
                key={`compositionNHS Numberno${props.index}composerName`}
              >
                Composer Name
              </NHSTh>
              <NHSTh
                key={`compositionNHS Numberno${props.index}episodeIdentifier`}
              >
                Episode
                Identifier
              </NHSTh>
              <NHSTh
                key={`compositionNHS Numberno${props.index}aofasComment`}
              >
                AOFAS Comment
              </NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            <Compositions
              key="compositions"
              ehrId={props.ehrId}
            />
          </NHSTBody>
        </NHSTable>
      </NHSTableWrapper>
    );
  }
  return null;
}

PatientProgressTable.propTypes = {
  index: PropTypes.number,
  ehrId: PropTypes.string,
};
