import React from 'react';
import CDROptions from "../components/Queries/CDROptions";
import {
    NHSPanelBody, NHSPanelConfirmation,
    NHSPanelTitle,
    NHSPanelWithLabel
} from "../components/react-styled-nhs/src/NHSPanel";
import getStructuredProcessedTemplate from "../components/GetStructuredProcessedTemplate";
import * as axios from "axios";
import { NHSButton } from "../components/react-styled-nhs/src/NHSComponents";
import {
    NHSSummaryList, NHSSummaryListChange,
    NHSSummaryListKey,
    NHSSummaryListRow,
    NHSSummaryListValue
} from "../components/react-styled-nhs/src/NHSSummaryList";
import HeaderMenu from "../components/HeaderMenu";
import NHSContainer from "../components/react-styled-nhs/src/NHSContainer";
import NHSWrapper from "../components/react-styled-nhs/src/NHSWrapper";
import qs from "qs";
import getCompositionByCompositionId from "../components/Queries/getCompositionByCompositionId";
import CDRAQLQuery from "../components/Queries/CDRAQLQuery";
import NHSBackLink from "../components/react-styled-nhs/src/NHSBackLink";
import { createBrowserHistory } from "history";

export class Composition extends React.Component {
    constructor(props) {
        super(props);
        this.compId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).compId ?
            qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).compId : "";
        this.state = {};
    }

    goBack() {
        createBrowserHistory().goBack();
    }

    componentDidMount() {
        let promise = getCompositionByCompositionId(this.compId);
        promise.then((e) => {
            let templatePromise = getStructuredProcessedTemplate(e.templateId);
            templatePromise.then((j) => {
                let mapping = getAqlMappingOfTemplate(j, {});
                let queryArray = [];
                Object.keys(mapping).map((i) => {
                    queryArray.push("a" + mapping[i][0] + " as " + i);
                });
                let queryString = queryArray.join(', ');
                let totalQuery = "select\n" +
                    queryString + "\n" +
                    "from EHR e\n" +
                    "contains COMPOSITION a\n" +
                    "where a/uid/value='" + e.compositionUid + "'";
                CDRAQLQuery(totalQuery, (result) => {
                    return result.resultSet ? result.resultSet : [];
                }).then((k) => {
                    const row = k[0];
                    const final = Object.keys(row).map((cell) => {
                        let valueToShow = JSON.stringify(row[cell]);
                            if (row[cell] != null && row[cell] != undefined) {
                                console.log(row[cell]);
                            valueToShow = row[cell].value !== undefined && row[cell].value !== null ? row[cell].value :
                                (row[cell].code_string ? row[cell].code_string : (row[cell].name ? row[cell].name : JSON.stringify((row[cell].terminology_id ? row[cell].terminology_id : '')))).toString();
                        }
                        return [mapping[cell][1], valueToShow];
                    });
                    this.setState({ composition: final });
                });
            });
        });
        // let promise = getStructuredProcessedTemplate(this.compId);
        // promise.then((e) => {
        //     this.setState({ template: e, mapping: getMappingOfTemplate(e, []) });
        // });
    }

    render() {
        if (!this.state.composition) return null;
        return (
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <HeaderMenu/>
                <NHSContainer>
                    <NHSWrapper>
                        <NHSBackLink onClick={this.goBack}>Go back</NHSBackLink>
                        <NHSSummaryList style={{ width: '70%' }}>
                            {this.state.composition.map(tableRow => <NHSSummaryListRow>
                                    <NHSSummaryListKey>{tableRow[0]}</NHSSummaryListKey>
                                    <NHSSummaryListValue>{tableRow[1]}</NHSSummaryListValue>
                                </NHSSummaryListRow>
                            )}
                        </NHSSummaryList>
                    </NHSWrapper>
                </NHSContainer>
            </div>
        );
    }
}


function getAqlMappingOfTemplate(props, result) {
    if ('children' in props) {
        props.children.map((child) => {
            getAqlMappingOfTemplate(child, result);
        });
    } else if ('aqlPath' in props) {
        result[props.id] = [props.aqlPath, props.name];
    }
    return result;
}
