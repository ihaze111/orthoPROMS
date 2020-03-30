import React from 'react';
import getAllergiesListByEHRId from '../../components/Queries/getAllergiesListByEHRId';
import { PatientAllergicTableEntry } from './PatientAllergicTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';

export class Allergies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const promise = getAllergiesListByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.setState({ allergies: e });
    });
  }

  render() {
    if (!this.state.allergies) return null;
    if (this.state.allergies.length > 0) {
      return this.state.allergies.map((e, index) => {
        e.index = index;
        return PatientAllergicTableEntry(e);
      });
    }
    return (
      <NHSTr key="noAllergiesRow">
        <NHSTd
          key="noAllergiesData"
          colSpan="6"
        >
          No allergies records were found
        </NHSTd>
      </NHSTr>
    );
  }
}

Allergies.propTypes = {
  ehrId: PropTypes.string,
};
