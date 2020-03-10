import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {NHSButton, NHSButtonSecondary} from "./NHSComponents";

class Home extends React.Component{
	render(){
		return(
			<div>
				<div style={{backgroundImage: 'url(./1.jpg)', height: '100vh', backgroundPosition: 'center center', backgroundSize: 'cover', textAlign: 'center !important'}}>
					<div style={{justifyContent: 'center', paddingTop: '18%'}}>
						<div style={{paddingLeft: '30%'}}>
						<h1 style={{fontFamily: 'Source Sans Pro', fontWeight: '700', fontSize: '5.5em'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPROMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
						</div>
						{/* <ButtonToolbar style={{marginLeft: '28%'}}> */}
						<div style={{paddingLeft: '40%', display:'inline-block', paddingTop: '5%'}}>
						<a href="/Login?id=1" style={{ color: "white"}}>
						<NHSButton className="patientButton">
						Patient
						{/* <a href="/Login?id=1" className="btn btn-primary btn-lg" style={{fontSize: '2.25rem'}}>Patient</a> */}
						</NHSButton></a></div>
						<div style={{display:'inline-block', paddingLeft: '15%'}}>
						<a href="/Login?id=2" style={{ color: "white"}}>
						<NHSButtonSecondary className="clinicianButton">
						Clinicians
						{/* <a href="/Login?id=2" className="btn btn-success btn-lg" style={{fontSize: '2.25rem'}}>Clinicians</a> */}
						</NHSButtonSecondary></a>
						</div>
						{/* </ButtonToolbar> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
