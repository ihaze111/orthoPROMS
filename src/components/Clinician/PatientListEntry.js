import React from 'react';

function PatientListEntry(props) {
  return (
    <tr>
      {/*<td>{props.id}</td>*/}
      {/*<td><a href={"PatientRecords?id=" + props.id + "&name=" + props.name + "&patientno=" + props.patientNumber*/}
      {/* + "&birthday=" + props.birthday + "&reason=" + props.ailments}>{props.name}</a></td>*/}
      {/*<td>{props.patientNumber}</td>*/}
      {/*<td>{props.birthday}</td>*/}
      {/*<td>{props.date}</td>*/}
      {/*<td>{props.patientType}</td>*/}
      {/*<td>{props.ailments}</td>*/}
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
