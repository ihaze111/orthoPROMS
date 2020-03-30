import React from 'react';
import getLabOrdersListByEHRId from '../../components/Queries/getLabOrdersListByEHRId';
import { LabOrdersTableEntry } from './LabOrdersTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';

export class LabOrders extends React.Component {
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

LabOrders.propTypes = {
  ehrId: PropTypes.string,
};