import * as PropTypes from 'prop-types';
import React from 'react';
import {
  NHSTable,
  NHSTableWrapper,
  NHSTBody,
  NHSTh,
  NHSTHead,
  NHSTr,
} from '../../../react-styled-nhs/src/NHSTableWrapperTest';
import PatientAllergiesTableEntries from './PatientAllergiesTableEntries';

/**
 * Table listing allergies relevant to a particular patient
 * @param props
 * @returns {null|*}
 * @constructor
 */
export default function PatientAllergiesTable(props) {
  if (props.ehrId) {
    return (
      <NHSTableWrapper>
        <NHSTable>
          <NHSTHead>
            <NHSTr key={`allergiesno${props.index}`}>
              <NHSTh key={`allergiesno${props.index}cause`}>Cause</NHSTh>
              <NHSTh
                key={`allergiesno${props.index}comment`}
              >
                Comment
              </NHSTh>
              <NHSTh
                key={`allergiesno${props.index}reaction`}
              >
                Reaction
              </NHSTh>
              <NHSTh
                key={`allergiesno${props.index}update_Exclusion_date`}
              >
                Exclusion Date
              </NHSTh>
              <NHSTh
                key={`allergiesno${props.index}composer`}
              >
                Composer Name
              </NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            <PatientAllergiesTableEntries ehrId={props.ehrId} />
          </NHSTBody>
        </NHSTable>
      </NHSTableWrapper>
    );
  }
  return null;
}

PatientAllergiesTable.propTypes = {
  index: PropTypes.number,
  ehrId: PropTypes.string,
};
