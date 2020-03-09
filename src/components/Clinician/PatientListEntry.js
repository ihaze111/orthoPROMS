import React from 'react';

function PatientListEntry(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td><a href={"PatientRecords?subjectId=" + props.subjectId}>{props.nhsNumber}</a></td>
            <td>{props.gender}</td>
            <td>{props.sex}</td>
            <td>{props.vitalStatus}</td>
            <td>{props.birthYear}</td>
            {/* <td>{props.timeCreated}</td> */}
        </tr>
    );
}

export default PatientListEntry;
