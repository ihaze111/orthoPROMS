import React from 'react';
import { Form } from 'formsy-react-components';
import ReactDOM from 'react-dom';
import * as axios from 'axios';
import * as PropTypes from 'prop-types';
import CDROptions from '../../cdr/CDROptions';
import JsonFormInputToNHSReact
  from '../../ehr-template-react-generator/src/JsonFormInputToNHSReact';
import {
  NHSPanelBody, NHSPanelConfirmation,
  NHSPanelTitle,
  NHSPanelWithLabel,
} from '../react-styled-nhs/src/NHSPanel';
import getStructuredProcessedTemplate from '../../cdr/getStructuredProcessedTemplate';
import { NHSButton } from '../react-styled-nhs/src/NHSComponents';
import {
  NHSSummaryList, NHSSummaryListChange,
  NHSSummaryListKey,
  NHSSummaryListRow,
  NHSSummaryListValue,
} from '../react-styled-nhs/src/NHSSummaryList';

/**
 * Commit composition to the CDR
 * @param model
 * @param ehrId
 * @param templateId
 * @returns {Promise<{message: string}|{commitId: *, message: string}>}
 */
async function commitComposition(model, ehrId, templateId) {
  let processedResult = [];
  const url = `/rest/v1/composition?ehrId=${ehrId}&templateId=${templateId}&format=FLAT`;
  const data = {
    ...model,
    'ctx/language': 'en',
    'ctx/territory': 'GB',
    // "ctx/composer_name": "Silvia Blake",
    // "ctx/id_namespace": "HOSPITAL-NS",
    // "ctx/id_scheme": "HOSPITAL-NS",
    // "ctx/health_care_facility|name": "Hospital",
    // "ctx/health_care_facility|id": "9091"
  };
  const options = CDROptions.generatePostAxiosOptions(url, data);

  return axios(options)
    .then((response) => {
      const result = response.data;
      if (response.status === 201) {
        processedResult = {
          status: 'success',
          message: 'Successfully committed',
          commitId: result.compositionUid,
        };
        // processedResult = result;
      } else {
        processedResult = {
          status: 'error',
          message: 'Error committing',
        };
      }
      return processedResult;
    })
    .catch((error) => {
      processedResult = {
        status: 'error',
        data: error.response.data,
      };
      return processedResult;
    });
}

/**
 * Auxilliary function for building template mapping
 * @param props
 * @param result
 * @returns {*}
 */
function getMappingOfTemplateAux(props, result) {
  if ('children' in props) {
    props.children.forEach((child) => {
      getMappingOfTemplateAux(child, result);
    });
  } else if ('inputs' in props) {
    result.push(props.inputs);
  }
  return result;
}

/**
 * Make mapping for template to make display neater
 * @param e
 */
function getMappingOfTemplate(e) {
  const result = {};
  getMappingOfTemplateAux(e, [])
    .forEach((keys) => {
      if (keys.type === 'options') {
        const mapping2 = {};
        keys.inputOptions.forEach((j) => {
          mapping2[j.value] = j.label;
        });
        result[keys.name] = [keys.label, mapping2];
      } else {
        result[keys.name] = [keys.label];
      }
    });
  return result;
}

/**
 * Individual card for subtree of template tree
 * @param props
 * @returns {null|*|null}
 * @constructor
 */
function RecursiveCard(props) {
  const color = props.color ? '#ffffff' : '#f0f4f5';
  if ('children' in props) {
    return (
      <NHSPanelWithLabel style={{ backgroundColor: color }}>
        <NHSPanelTitle className="nhsuk-panel-with-label__label">{props.name}</NHSPanelTitle>
        <NHSPanelBody>
          {JsonFormInputToNHSReact(props.inputs)}
          {props.children.map((child) => RecursiveCard({
            ...child,
            color: !props.color,
          }))}
        </NHSPanelBody>
      </NHSPanelWithLabel>
    );
  }
  if ('inputs' in props) {
    return JsonFormInputToNHSReact(props.inputs);
  }
  return null;
}

RecursiveCard.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  inputs: PropTypes.shape({}),
  children: PropTypes.arrayOf(PropTypes.object),
};

function CommitConfirmation(props) {
  return (
    <NHSPanelConfirmation>
      <NHSPanelTitle>{props.title}</NHSPanelTitle>
      <NHSPanelBody>
        {props.message}
      </NHSPanelBody>
      <NHSButton
        style={{
          float: 'right',
          marginTop: '10px',
        }}
        onClick={props.onClick}
      >
        Done
      </NHSButton>
    </NHSPanelConfirmation>
  );
}

CommitConfirmation.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onClick: PropTypes.func,
};
/**
 * Survey for display as PROMs survey. Structured into hierarchy.
 */
export default class StructuredSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = { canSubmit: false };
  }

  componentDidMount() {
    const promise = getStructuredProcessedTemplate(this.props.templateId);
    promise.then((e) => {
      this.setState({
        template: e,
        // eslint-disable-next-line react/no-unused-state
        mapping: getMappingOfTemplate(e, []),
      });
    });
  }

  backToForm = () => {
    document.getElementById('result').hidden = true;
    document.getElementById('surveyForm').hidden = false;
  };

  reloadPage = () => {
    window.location.reload();
  };

  async submitModel(model) {
    let element;
    const reply = await commitComposition(model, this.props.ehrId, this.props.templateId);
    if (reply.status === 'error' || !('commitId' in reply)) {
      // there is an error
      if ('message' in reply) {
        element = (
          <CommitConfirmation
            title={reply.message}
            message="Please try again later, or contact your admin team."
            onClick={this.reloadPage}
          />
        );
      } else if ('data' in reply) {
        element = (
          <CommitConfirmation
            title={reply.data.userMessage}
            message={reply.data.exceptionMessage}
            onClick={this.reloadPage}
          />
        );
      } else {
        element = (
          <CommitConfirmation
            title="Error committing"
            message="Please try again later, or contact your admin team."
            onClick={this.reloadPage}
          />
        );
      }
    } else {
      element = (
        <CommitConfirmation
          title={reply.message}
          message={`Composition identifier: ${reply.commitId}`}
          onClick={this.reloadPage}
        />
      );
    }
    ReactDOM.render(element, document.getElementById('result'));
    document.getElementById('result').hidden = false;
    document.getElementById('surveyForm').hidden = true;
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submitMe(model, thisAccess) {
    const element = (
      <div>
        <h2>Review your answers</h2>
        <NHSSummaryList>
          {Object.keys(model)
            .map((e) => {
              if (thisAccess.state.mapping[e].length === 1) {
                return (
                  <NHSSummaryListRow key={`promsResult${thisAccess.state.mapping[e][0]}`}>
                    <NHSSummaryListKey>{thisAccess.state.mapping[e][0]}</NHSSummaryListKey>
                    <NHSSummaryListValue>{model[e]}</NHSSummaryListValue>
                    <NHSSummaryListChange onClick={this.backToForm} />
                  </NHSSummaryListRow>
                );
              }
              return (
                <NHSSummaryListRow key={`promsResult${thisAccess.state.mapping[e][0]}`}>
                  <NHSSummaryListKey>{thisAccess.state.mapping[e][0]}</NHSSummaryListKey>
                  <NHSSummaryListValue>
                    {thisAccess.state.mapping[e][1][model[e]]}
                  </NHSSummaryListValue>
                  <NHSSummaryListChange onClick={this.backToForm} />
                </NHSSummaryListRow>
              );
            })}
        </NHSSummaryList>
        <NHSButton
          onClick={this.backToForm}
          style={{ marginRight: '10px' }}
        >
          Edit your answers
        </NHSButton>
        <NHSButton onClick={() => this.submitModel(model)}>Submit</NHSButton>
      </div>
    );
    ReactDOM.render(element, document.getElementById('result'));
    document.getElementById('result').hidden = false;
    document.getElementById('surveyForm').hidden = true;
  }

  render() {
    if (!this.state.template) return null;
    const sample = this.state.template;
    return (
      <div>
        <Form
          onValidSubmit={(model) => this.submitMe(model, this)}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          id="surveyForm"
        >
          {RecursiveCard({ color: true, ...sample })}
          <NHSButton
            type="submit"
            disabled={!this.state.canSubmit}
            defaultValue="Submit"
          >
            Submit
          </NHSButton>
        </Form>
        <div
          id="result"
          hidden
        />
      </div>
    );
  }
}

StructuredSurvey.propTypes = {
  ehrId: PropTypes.string,
  templateId: PropTypes.string,
};
