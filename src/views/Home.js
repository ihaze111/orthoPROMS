import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';




class Home extends React.Component{
	constructor(props) {
		super(props)
	}
	render(){
		return(
			<div>
				
				<div style={{backgroundImage: 'url(./1.jpg)', height: '100vh', backgroundPosition: 'center center', backgroundSize: 'cover', textAlign: 'center !important'}}>
					<div style={{justifyContent: 'center', paddingTop: '18%', display: 'grid'}}>
						<h1 style={{fontFamily: 'Source Sans Pro', fontWeight: '700', fontSize: '5.5em'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPROMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
						<ButtonToolbar style={{marginLeft: '28%'}}>
						<a href="/Login?id=1" className="btn btn-primary btn-lg" style={{fontSize: '2.25rem'}}>Patient</a>&nbsp;&nbsp;&nbsp;
						<a href="/Login?id=2" className="btn btn-success btn-lg" style={{fontSize: '2.25rem'}}>Clinicians</a>
						</ButtonToolbar>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
