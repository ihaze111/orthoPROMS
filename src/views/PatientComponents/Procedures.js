import React from 'react';
import * as PropTypes from 'prop-types';
import getProceduresListByEHRId from '../../components/Queries/getProceduresListByEHRId';
import ProceduresTableEntry from './ProceduresTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';

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

export default class Procedures extends React.Component {
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

Procedures.propTypes = {
  ehrId: PropTypes.string,
};
