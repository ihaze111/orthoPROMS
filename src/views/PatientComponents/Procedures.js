import React from 'react';
import getProceduresListByEHRId from '../../components/Queries/getProceduresListByEHRId';
import { ProceduresTableEntry } from './ProceduresTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';

export class Procedures extends React.Component {
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
      <NHSTr key="noProceduresRow">
        <NHSTd
          key="noProceduresData"
          colSpan="7"
        >
          No procedures records were found
        </NHSTd>
      </NHSTr>
    );
  }
}

Procedures.propTypes = {
  ehrId: PropTypes.string,
};
