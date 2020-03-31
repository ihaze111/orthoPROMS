import React from 'react';
import getLabReportsListByEHRId from '../../components/Queries/getLabReportsListByEHRId';
import LabReportsTableEntry from './LabReportsTableEntry';
import * as PropTypes from 'prop-types';

export class LabReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const promise = getLabReportsListByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.setState({ reports: e });
    });
  }

  render() {
    if (!this.state.reports) return null;
    if (this.state.reports.length > 0) {
      return this.state.reports.map((e, index) => {
        e.index = index;
        return LabReportsTableEntry(e);
      });
    }
    return (
      <tr key="noLabReports">
        <td
          key="noLabReports"
          colSpan="7"
        >
          No lab reports records were found
        </td>
      </tr>
    );
  }
}

LabReports.propTypes = {
  ehrId: PropTypes.string,
};
