import React from 'react';
import * as PropTypes from 'prop-types';
import { NHSFormGroup, NHSFormLabel } from '../react-styled-nhs/src/NHSComponents';
import NHSCheckbox from '../react-styled-nhs/src/NHSCheckbox';
import {
  NHSSummaryList,
  NHSSummaryListKey,
  NHSSummaryListRow,
  NHSSummaryListValue,
} from '../react-styled-nhs/src/NHSSummaryList';

export default class CompositionSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showAll: false };
  }

  handleChange = (e) => {
    this.setState({ showAll: e.target.checked });
  };

  render() {
    return (
      <div>
        <NHSFormGroup onChange={this.handleChange}>
          <NHSFormLabel>Show empty rows</NHSFormLabel>
          <NHSCheckbox name="showEmpty" />
        </NHSFormGroup>
        <NHSSummaryList style={{ width: '70%' }}>
          {this.props.composition.filter(
            (tableRow) => this.state.showAll
              || tableRow[1] !== undefined,
          )
            .map((tableRow) => (
              <NHSSummaryListRow key={`compositionProperty${tableRow[0]}`}>
                <NHSSummaryListKey>{tableRow[0]}</NHSSummaryListKey>
                <NHSSummaryListValue>{tableRow[1]}</NHSSummaryListValue>
              </NHSSummaryListRow>
            ))}
        </NHSSummaryList>
      </div>
    );
  }
}

CompositionSummary.propTypes = {
  composition: PropTypes.arrayOf(PropTypes.array),
};
