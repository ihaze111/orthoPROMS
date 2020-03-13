import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {NHSButton, NHSButtonSecondary} from "../components/nhsuk-frontend-react/NHSComponents";
import NHSContainer from '../components/nhsuk-frontend-react/NHSContainer';
import NHSWrapper from '../components/nhsuk-frontend-react/NHSWrapper';
import { NHSPanelWithLabel, NHSPanelTitle, NHSPanelBody } from '../components/nhsuk-frontend-react/NHSPanel';
import { NHSVectorArrowRightCircle } from "../components/nhsuk-frontend-react/NHSIcons";
import NHSFooter from "../components/nhsuk-frontend-react/NHSFooter";




class Home extends React.Component{
	constructor(props) {
		super(props)
	}
	render(){
		return(
			
			<div style={{ backgroundColor: '#f0f4f5' }}>
				<div style={{backgroundImage: 'url(./1.jpg)', height: '60vh', backgroundPosition: 'center top', backgroundSize: '100%', textAlign: 'center !important'}}>
					<div style={{justifyContent: 'center', paddingTop: '12%'}}>
						<div style={{paddingLeft: '30%'}}>
							<h1 style={{fontFamily: 'Frutiger W01, Arial, Sans-serif', fontWeight: '700', fontSize: '5.5em'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPROMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
						</div>
					</div>
				</div>
				<NHSContainer>
					<NHSWrapper style={{paddingTop: '8px'}}>
						<div className="nhsuk-grid-row">
							<div className="nhsuk-grid-column-one-half">
								<NHSPanelWithLabel>
									<NHSPanelTitle class="nhsuk-panel-with-label__label">
										Patient
									</NHSPanelTitle>
									<NHSPanelBody>
										<div class="nhsuk-u-reading-width">
      										<p>Login using your patient's account</p>
    									</div>
										<div className="nhsuk-action-link">
                                            <a className="nhsuk-action-link__link" href={'/Login?id=1'}>
                                                <NHSVectorArrowRightCircle/>
                                                <span className="nhsuk-action-link__text">Login as Patient</span>
                                            </a>
                                        </div>
									</NHSPanelBody>
								</NHSPanelWithLabel>
							</div>
							<div className="nhsuk-grid-column-one-half">
							<NHSPanelWithLabel>
									<NHSPanelTitle class="nhsuk-panel-with-label__label">
										Clinician
									</NHSPanelTitle>
									<NHSPanelBody>
										<div class="nhsuk-u-reading-width">
      										<p>Login using your clinician's account</p>
    									</div>
										<div className="nhsuk-action-link">
                                            <a className="nhsuk-action-link__link" href={'/Login?id=2'}>
                                                <NHSVectorArrowRightCircle/>
                                                <span className="nhsuk-action-link__text">Login as Clinician</span>
                                            </a>
                                        </div>
									</NHSPanelBody>
								</NHSPanelWithLabel>
							</div>
						</div>
					</NHSWrapper>
				</NHSContainer>
				<NHSFooter/>
			</div>
		);


		// return(
		// 	<div>

		// 		<div style={{backgroundImage: 'url(./1.jpg)', height: '100vh', backgroundPosition: 'center center', backgroundSize: 'cover', textAlign: 'center !important'}}>
		// 			<div style={{justifyContent: 'center', paddingTop: '18%'}}>
		// 				<div style={{paddingLeft: '30%'}}>
		// 				<h1 style={{fontFamily: 'Source Sans Pro', fontWeight: '700', fontSize: '5.5em'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IPROMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
		// 				</div>
		// 				{/* <ButtonToolbar style={{marginLeft: '28%'}}> */}
		// 				<div style={{paddingLeft: '40%', display:'inline-block', paddingTop: '5%'}}>
		// 				<a href="/Login?id=1" style={{ color: "white"}}>
		// 				<NHSButton>
		// 				Patient
		// 				</NHSButton></a></div>
		// 				<div style={{display:'inline-block', paddingLeft: '15%'}}>
		// 				<a href="/Login?id=2" style={{ color: "white"}}>
		// 				<NHSButtonSecondary>
		// 				Clinicians
		// 				</NHSButtonSecondary></a>
		// 				</div>
		// 				{/* </ButtonToolbar> */}
		// 			</div>
		// 		</div>
		// 	</div>
		// );
	}
}

export default Home;
