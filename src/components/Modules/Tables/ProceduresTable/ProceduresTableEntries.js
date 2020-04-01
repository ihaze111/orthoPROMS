import React from 'react';
import * as PropTypes from 'prop-types';
import getProceduresListByEHRId from '../../../../cdr/getProceduresListByEHRId';
import ProceduresTableEntry from './ProceduresTableEntry';
import { NHSTd, NHSTr } from '../../../react-styled-nhs/src/NHSTableWrapperTest';

/**
 * Table row to display when no procedures relevant to a patient are found
 * @param props
 * @returns {*}
 * @constructor
 */
function NHSNoneFoundTableRow(props) {
  return (
    <NHSTr key={`${props.key}Row`}>
      <NHSTd key={`${props.key}Data`}>
        {props.children}
      </NHSTd>
    </NHSTr>
  );
}

NHSNoneFoundTableRow.propTypes = {
  key: PropTypes.string,
  children: PropTypes.shape({}),
};

/**
 * Get individual entries list for procedures table
 */
export default class ProceduresTableEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const promise = getProceduresListByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.setState({ procedures: e });
    });
  }

  render() {
    if (!this.state.procedures) return null;
    if (this.state.procedures.length > 0) {
      return this.state.procedures.map((e, index) => {
        e.index = index;
        return ProceduresTableEntry(e);
      });
    }
    return (
      <NHSNoneFoundTableRow
        key="noProcedures"
        colSpan="7"
      >
        No procedures records were found.
      </NHSNoneFoundTableRow>
    );
  }
}

ProceduresTableEntries.propTypes = {
  ehrId: PropTypes.string,
};
