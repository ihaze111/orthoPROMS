import React from 'react';
import { NHSTd, NHSTr } from "../react-styled-nhs/src/NHSTableWrapperTest";
import * as PropTypes from "prop-types";

/**
 * Create an (NHS-styled) table entry for an individual patient in the list of patients that is displayed to a clinician
 * @param props
 * @returns {*}
 * @constructor
 */
function PatientListEntry(props) {
    return (
        <NHSTr>
            <NHSTd>{props.id}</NHSTd>
            <NHSTd><a href={"PatientRecords?subjectId=" + props.subjectId}>{props.nhsNumber}</a></NHSTd>
            <NHSTd>{props.gender}</NHSTd>
            <NHSTd>{props.sex}</NHSTd>
            <NHSTd>{props.vitalStatus}</NHSTd>
            <NHSTd>{props.birthYear}</NHSTd>
        </NHSTr>
    );
}

PatientListEntry.propTypes = {
    id: PropTypes.number,
    subjectId: PropTypes.string,
    nhsNumber: PropTypes.string,
    gender: PropTypes.string,
    sex: PropTypes.string,
    vitalStatus: PropTypes.string,
    birthYear: PropTypes.string
};

export default PatientListEntry;
