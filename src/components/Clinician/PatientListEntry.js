import React from 'react';

function PatientListEntry(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td><a href={"PatientRecords?id=" + props.id + "&name=" + props.patientId + "&patientno=" + props.nhsNumber
       + "&birthday=1995-10-11&reason=Lurgy"}>{props.patientId}</a></td>
      <td>{props.gender}</td>
      <td>{props.sex}</td>
      <td>{props.vitalStatus}</td>
      <td>{props.birthYear}</td>
      <td>{props.nhsNumber}</td>
      <td>{props.timeCreated}</td>
    </tr>
  );
}

export default PatientListEntry;
