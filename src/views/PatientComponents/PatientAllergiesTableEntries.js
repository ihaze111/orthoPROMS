import React from 'react';
import getAllergiesListByEHRId from '../../components/Queries/getAllergiesListByEHRId';
import { PatientAllergicTableEntry } from './PatientAllergicTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import * as PropTypes from 'prop-types';

function NoAllergiesError() {
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

export class AllergiesTableEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getAllergiesListByEHRId(this.props.ehrId)
      .then((e) => {
        // this.setState({ allergies: e });
      });
  }

  render() {
    if (!this.state.allergies) return <NoAllergiesError />;
    return this.state.allergies.map((e, index) => {
      e.index = index;
      return PatientAllergicTableEntry(e);
    });
  }
}

AllergiesTableEntries.propTypes = {
  ehrId: PropTypes.string,
};
