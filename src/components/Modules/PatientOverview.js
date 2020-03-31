import React from 'react';
import * as PropTypes from 'prop-types';
import getEHRByNHSNumber from '../../cdr/getEHRByNHSNumber';
import {
  NHSSummaryList,
  NHSSummaryListKey,
  NHSSummaryListRow,
  NHSSummaryListValue,
} from '../react-styled-nhs/src/NHSSummaryList';

export default class PatientOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { subjectId } = this.props;
    const promise = getEHRByNHSNumber(subjectId);
    promise.then((e) => {
      this.setState({ ehr: e });
    });
  }

  render() {
    if (!this.state.ehr) return null;
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          <NHSSummaryList>
            <NHSSummaryListRow>
              <NHSSummaryListKey>EHR ID</NHSSummaryListKey>
              <NHSSummaryListValue>{this.state.ehr.ehrId}</NHSSummaryListValue>
            </NHSSummaryListRow>
            <NHSSummaryListRow>
              <NHSSummaryListKey>NHS Number</NHSSummaryListKey>
              <NHSSummaryListValue>{this.props.subjectId}</NHSSummaryListValue>
            </NHSSummaryListRow>
            <NHSSummaryListRow>
              <NHSSummaryListKey>Birth year</NHSSummaryListKey>
              <NHSSummaryListValue>{this.state.ehr.birthYear}</NHSSummaryListValue>
            </NHSSummaryListRow>
            <NHSSummaryListRow>
              <NHSSummaryListKey>Administrative Gender</NHSSummaryListKey>
              <NHSSummaryListValue>{this.state.ehr.administrativeGender}</NHSSummaryListValue>
            </NHSSummaryListRow>
            <NHSSummaryListRow>
              <NHSSummaryListKey>Birth sex</NHSSummaryListKey>
              <NHSSummaryListValue>{this.state.ehr.birthSex}</NHSSummaryListValue>
            </NHSSummaryListRow>
            <NHSSummaryListRow>
              <NHSSummaryListKey>Vital status</NHSSummaryListKey>
              <NHSSummaryListValue>{this.state.ehr.vitalStatus}</NHSSummaryListValue>
            </NHSSummaryListRow>
          </NHSSummaryList>
        </div>
        <div style={{
          width: '30%',
          alignSelf: 'center',
          textAlign: 'center',
        }}
        >
          <img
            src="./240px-User_icon_2.svg.png"
            style={{ width: '40%' }}
            alt=""
          />
        </div>
      </div>
    );
  }
}

PatientOverview.propTypes = {
  subjectId: PropTypes.string,
};
