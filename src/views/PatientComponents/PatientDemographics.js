import React from 'react';
import * as PropTypes from 'prop-types';
import getPatientDemographicsByEHRId from '../../components/Queries/getPatientDemographicsByEHRId';
import { NHSPanelBody } from '../../components/react-styled-nhs/src/NHSPanel';
import {
  NHSSummaryList,
  NHSSummaryListKey,
  NHSSummaryListRow,
  NHSSummaryListValue,
} from '../../components/react-styled-nhs/src/NHSSummaryList';

export default class PatientDemographics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const promise = getPatientDemographicsByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.setState({ demographics: e });
    });
  }

  render() {
    if (!this.state.demographics) return <div />;
    return (
      <details className="nhsuk-details nhsuk-expander">
        <summary className="nhsuk-details__summary">
          <span className="nhsuk-details__summary-text">Demographic information</span>
        </summary>
        <div className="nhsuk-details__text">
          <h4>Demographic information</h4>
          <h5>Information stored in seperate demographic record</h5>
          <NHSPanelBody>
            <NHSSummaryList>
              {this.state.demographics.map((e) => (
                <NHSSummaryListRow key={`demographics-${e[0]}`}>
                  <NHSSummaryListKey>{e[0]}</NHSSummaryListKey>
                  <NHSSummaryListValue>{e[1]}</NHSSummaryListValue>
                </NHSSummaryListRow>
              ))}
            </NHSSummaryList>
          </NHSPanelBody>
        </div>
      </details>
    );
  }
}

PatientDemographics.propTypes = {
  ehrId: PropTypes.string,
};
