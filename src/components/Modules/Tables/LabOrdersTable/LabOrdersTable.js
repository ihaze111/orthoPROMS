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
import LabOrdersTableEntries from './LabOrdersTableEntries';

export default function LabOrdersTable(props) {
  if (props.ehrId) {
    return (
      <NHSTableWrapper>
        <NHSTable>
          <NHSTHead>
            <NHSTr key={`ordersno${props.index}`}>
              <NHSTh
                key={`ordersno${props.index}request`}
                style={{ width: '8px' }}
              >
                Requests
              </NHSTh>
              <NHSTh
                key={`ordersno${props.index}timing`}
              >
                Request Timing
              </NHSTh>
              <NHSTh
                key={`ordersno${props.index}context_time`}
              >
                Time
              </NHSTh>
              <NHSTh
                key={`ordersno${props.index}composer`}
              >
                Composer Name
              </NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            <LabOrdersTableEntries
              key="orders"
              ehrId={props.ehrId}
            />
          </NHSTBody>
        </NHSTable>
      </NHSTableWrapper>
    );
  }
  return null;
}

LabOrdersTable.propTypes = {
  index: PropTypes.number,
  ehrId: PropTypes.string,
};
