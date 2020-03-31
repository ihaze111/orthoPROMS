import React from 'react';
import * as PropTypes from 'prop-types';
import getAllergiesListByEHRId from '../../components/Queries/getAllergiesListByEHRId';
import PatientAllergiesTableEntry from './PatientAllergiesTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';

function PatientAllergiesTableEmptyError() {
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

export default class PatientAllergiesTableEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getAllergiesListByEHRId(this.props.ehrId)
      .then((e) => {
        this.setState({ allergies: e });
      });
    // TODO: deal with query error
  }

  render() {
    if (!this.state.allergies) return <PatientAllergiesTableEmptyError />;
    return this.state.allergies.map((e, index) => {
      e.index = index;
      return PatientAllergiesTableEntry(e);
    });
  }
}

PatientAllergiesTableEntries.propTypes = {
  ehrId: PropTypes.string,
};
