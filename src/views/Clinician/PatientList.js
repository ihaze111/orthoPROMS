import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import HeaderMenu from "../../components/HeaderMenu";
import PatientListEntry from "../../components/Clinician/PatientListEntry";

function PatientList() {
	return (
		<div>
			<HeaderMenu/>
			<Container>
				<div style={{ height: '50px' }}></div>
				<div style={{ display: 'block', textAlign: 'center' }}>
					<div><h1>Patient List</h1></div>
					<Table striped bordered hover>
						<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Patient Number</th>
							<th>Birthday</th>
							<th>Date</th>
							<th>Patient Type</th>
							<th>Comments</th>
						</tr>
						</thead>
						<tbody>
						<PatientListEntry id={"1"} name={"Mark"} patientNumber={"800032"} birthday={"19750324"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@mdo"}/>
						<PatientListEntry id={"2"} name={"Jacob"} patientNumber={"800033"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"3"} name={"Jacob"} patientNumber={"800034"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"4"} name={"Jacob"} patientNumber={"800035"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"5"} name={"Jacob"} patientNumber={"800036"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"6"} name={"Jacob"} patientNumber={"800037"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"7"} name={"Jacob"} patientNumber={"800038"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"Out-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"8"} name={"Jacob"} patientNumber={"800039"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"9"} name={"Jacob"} patientNumber={"800040"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"Out-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"10"} name={"Jacob"} patientNumber={"800041"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"11"} name={"Jacob"} patientNumber={"800042"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"12"} name={"Jacob"} patientNumber={"800043"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"13"} name={"Jacob"} patientNumber={"800044"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"Out-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"14"} name={"Jacob"} patientNumber={"800045"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						<PatientListEntry id={"15"} name={"Jacob"} patientNumber={"800046"} birthday={"19870608"}
										  date={"19/10/2019"}
										  patientType={"In-Patient"} ailments={"@fat"}/>
						</tbody>
					</Table>
				</div>
			</Container>

		</div>
	);
}

export default PatientList;
