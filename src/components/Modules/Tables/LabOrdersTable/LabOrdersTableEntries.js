import React from 'react';
import * as PropTypes from 'prop-types';
import getLabOrdersListByEHRId from '../../../../cdr/getLabOrdersListByEHRId';
import LabOrdersTableEntry from './LabOrdersTableEntry';
import { NHSTd, NHSTr } from '../../../react-styled-nhs/src/NHSTableWrapperTest';

export default class LabOrdersTableEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const promise = getLabOrdersListByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.setState({ orders: e });
    });
  }

  render() {
    if (!this.state.orders) return null;
    if (this.state.orders.length > 0) {
      return this.state.orders.map((e, index) => {
        e.index = index;
        return LabOrdersTableEntry(e);
      });
    }
    return (
      <NHSTr key="noLabOrders">
        <NHSTd
          key="noLabOrders"
          colSpan="7"
        >
          No lab orders records were found
        </NHSTd>
      </NHSTr>
    );
  }
}

LabOrdersTableEntries.propTypes = {
  ehrId: PropTypes.string,
};
