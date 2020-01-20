import React from 'react';

function PatientListEntry(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td><a href={"PatientRecords?id=" + props.id + "&name=" + props.name + "&patientno=" + props.patientNumber
             + "&birthday=" + props.birthday + "&reason=" + props.ailments}>{props.name}</a></td>
            <td>{props.patientNumber}</td>
            <td>{props.birthday}</td>
            <td>{props.date}</td>
            <td>{props.patientType}</td>
            <td>{props.ailments}</td>
        </tr>
    );
}

export default PatientListEntry;
