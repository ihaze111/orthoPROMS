import * as PropTypes from 'prop-types';
import React from 'react';
import {
  NHSTable,
  NHSTableWrapper,
  NHSTBody,
  NHSTh,
  NHSTHead,
  NHSTr,
} from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import LabOrders from './LabOrders';

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
            <LabOrders
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
