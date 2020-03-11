import React from 'react';
import { NHSTd, NHSTr } from "../NHS/NHSTableWrapperTest";

function PatientListEntry(props) {
    return (
        <NHSTr>
            <NHSTd>{props.id}</NHSTd>
            <NHSTd><a href={"PatientRecords?subjectId=" + props.subjectId}>{props.nhsNumber}</a></NHSTd>
            <NHSTd>{props.gender}</NHSTd>
            <NHSTd>{props.sex}</NHSTd>
            <NHSTd>{props.vitalStatus}</NHSTd>
            <NHSTd>{props.birthYear}</NHSTd>
            {/* <td>{props.timeCreated}</td> */}
        </NHSTr>
    );
}

export default PatientListEntry;
