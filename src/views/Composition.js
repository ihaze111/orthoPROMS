import React from 'react';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import * as PropTypes from 'prop-types';
import getStructuredProcessedTemplate from '../cdr/GetStructuredProcessedTemplate';
import {
  NHSSummaryList,
  NHSSummaryListKey,
  NHSSummaryListRow,
  NHSSummaryListValue,
} from '../components/react-styled-nhs/src/NHSSummaryList';
import HeaderMenu from '../components/HeaderMenu';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import getCompositionByCompositionId from '../cdr/getCompositionByCompositionId';
import CDRAQLQuery from '../cdr/CDRAQLQuery';
import NHSBackLink from '../components/react-styled-nhs/src/NHSBackLink';
import NHSCheckbox from '../components/react-styled-nhs/src/NHSCheckbox';
import { NHSFormGroup, NHSFormLabel } from '../components/react-styled-nhs/src/NHSComponents';

function forceIdentifier(identifier) {
  return identifier.replace(/[^A-Za-z09_]/gi, '');
}

/**
 * Get a list of the aql paths to write compositions to, along with the name of the field, all
 * mapped to the field id
 * @param props
 * @param result
 * @returns {*}
 */
function getAqlMappingOfTemplate(props, result) {
  const newResult = result;
  if ('children' in props) {
    props.children.forEach((child) => {
      getAqlMappingOfTemplate(child, newResult);
    });
  } else if ('aqlPath' in props) {
    newResult[forceIdentifier(props.id)] = [props.aqlPath, props.name];
  }
  return newResult;
}

/**
 * Composition page, showing information about a single composition
 */
// eslint-disable-next-line import/prefer-default-export
export class Composition extends React.Component {
  constructor(props) {
    super(props);
    this.compId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).compId
      ? qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).compId : '';
    this.state = {
      showAll: false,
    };
    this.handleChange = (e) => {
      this.setState({ showAll: e.target.checked });
    };
  }

  componentDidMount() {
    const promise = getCompositionByCompositionId(this.compId);
    promise.then((e) => {
      const templatePromise = getStructuredProcessedTemplate(e.templateId);
      templatePromise.then((j) => {
        const mapping = getAqlMappingOfTemplate(j, {});
        const queryArray = [];
        Object.keys(mapping)
          .forEach((i) => {
            queryArray.push(`a${mapping[i][0]} as ${i}`);
          });
        const queryString = queryArray.join(', ');
        const totalQuery = `select\n${queryString}\n`
          + 'from EHR e\n'
          + 'contains COMPOSITION a\n'
          + `where a/uid/value='${e.compositionUid}'`;
        CDRAQLQuery(
          totalQuery,
          (result) => (result.resultSet ? result.resultSet : []),
        )
          .then((k) => {
            const row = k[0];
            // Merge rows if query returns multiple rows for same commit
            k.forEach((queryRow) => {
              Object.keys(queryRow)
                .forEach((queryCell) => {
                  // TODO: look into specifics of how this works to prevent overwriting
                  // NB if there are any different values in same column, this will overwrite
                  row[queryCell] = row[queryCell] === null ? queryRow[queryCell] : row[queryCell];
                });
            });
            const final = Object.keys(row)
              .map((cell) => {
                let valueToShow;
                if (row[cell] != null) {
                  switch (row[cell]['@class']) {
                    case 'DV_DATE_TIME':
                      valueToShow = row[cell].value;
                      break;
                    case 'DV_ORDINAL':
                      valueToShow = (
                        <span>
                          {row[cell].symbol.value}
                          {' '}
                          <span
                            style={{ color: 'grey' }}
                          >
                            (
                            {row[cell].value}
                            )
                          </span>
                        </span>
                      );
                      break;
                    case 'DV_CODED_TEXT':
                      valueToShow = row[cell].value;
                      break;
                    case 'CODE_PHRASE':
                      valueToShow = row[cell].terminology_id.code_string;
                      break;
                    case 'PARTY_IDENTIFIED':
                      valueToShow = row[cell].name;
                      break;
                    case 'DV_QUANTITY':
                      valueToShow = `${row[cell].magnitude} ${row[cell].units}`;
                      break;
                    case 'DV_PROPORTION':
                      valueToShow = (
                        <span>
                          <sup>{row[cell].numerator}</sup>
                          &frasl;
                          <sub>{row[cell].denominator}</sub>
                        </span>
                      );
                      break;
                    case 'DV_TEXT':
                      valueToShow = row[cell].value;
                      break;
                    case 'PARTY_SELF':
                      valueToShow = <span style={{ color: 'grey' }}>(self)</span>;
                      break;
                    case 'DV_PARSABLE':
                      valueToShow = row[cell].value;
                      break;
                    case 'DV_COUNT':
                      valueToShow = row[cell].magnitude;
                      break;
                    default:
                      valueToShow = JSON.stringify(row[cell]);
                      break;
                  }
                }
                return [mapping[cell][1], valueToShow];
              });
            this.setState({ composition: final });
          })
          .catch((k) => {
            throw k;
          });
      });
    });
  }

  goBack = () => {
    createBrowserHistory()
      .goBack();
  };

  render() {
    if (!this.state.composition) return null;
    return (
      <div style={{ backgroundColor: '#f0f4f5' }}>
        <HeaderMenu />
        <NHSContainer>
          <NHSWrapper>
            <NHSBackLink onClick={this.goBack}>Go back</NHSBackLink>
            <NHSFormGroup onChange={this.handleChange}>
              <NHSFormLabel>Show empty rows</NHSFormLabel>
              <NHSCheckbox name="showEmpty" />
            </NHSFormGroup>
            <NHSSummaryList style={{ width: '70%' }}>
              {this.state.composition.filter(
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
          </NHSWrapper>
        </NHSContainer>
      </div>
    );
  }
}

Composition.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};
