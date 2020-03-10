import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import HeaderMenu from '../components/HeaderMenu';
import NHSHeader from "../components/NHS/NHSHeader";
import NHSContainer from "../components/NHS/NHSContainer";
import NHSWrapper from "../components/NHS/NHSWrapper";


function DevelopersTableEntry(props){
    return (<tr>
        <td>{props.name}</td>
        <td><a href={"mailto:" + props.email}>{props.email}</a></td>
    </tr>);
}

function PartnersEntry(props){
    return (<tr>
        <td>{props.name}</td>
        <td><a href={props.website}>{props.website}</a></td>
    </tr>);
}

class About extends React.Component{
    render(){
        return(
            <div>
                <NHSHeader/>
                <NHSContainer>
                    <NHSWrapper>
                    <div style={{ height: '30px' }}></div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{fontSize:'40px'}}><strong>About Us</strong></p>
                        </div>
                    </div>
                    <Card>
                        <Card.Header>
                            What Is IPROMS?
                        </Card.Header>
                        <Card.Body>
                            <div style={{height: '10px'}}></div>
                            <div style={{width: '90%' , display: 'flex'}}>
                                <p>IPROMS is a web-app intended for both clinicians and patients to record outcomes
                                    from orthopaedic surgeries as well as storing and visualising data using openEHR
                                    standards.<br/><br/>
                                    We intend to help clinicians keep track of their patients' progress post-surgery
                                    while being a transparent medium for patients to see their own progress. At the same time,
                                    patients are able to give feedback on how their conditions after surgery that would be
                                    beneficial for both patients and clinicians to determine the next step for recovery.<br/><br/>
                                    IPROMS is a project made by three UCL students in partnership with Apperta Foundation and Code4Health.
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                    {/* <Accordion defaultActiveKey="1"> */}
                    <Card>
                        {/* <Accordion.Toggle as={Card.Header} eventKey="0">
                            Developers
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"> */}
                        <Card.Header>
                            Developers
                        </Card.Header>
                            <Card.Body>
                                <div style={{ height: '10px' }}></div>
                                <div style={{ display: 'flex'}}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Developers</th>
                                                <th>Emails</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <DevelopersTableEntry name="Charles Cowan"
                                                                email="charlie.cowan.18@ucl.ac.uk"/>
                                            <DevelopersTableEntry name="Menghang Hao"
                                                                email="menghang.hao.18@ucl.ac.uk"/>
                                            <DevelopersTableEntry name="Haze Al-Johary"
                                                                email="haziq.al-johary.18@ucl.ac.uk"/>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        {/* </Accordion.Collapse> */}
                    </Card>
                    <Card>
                        {/* <Accordion.Toggle as={Card.Header} eventKey="0">
                            Our Partners
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0"> */}
                        <Card.Header>
                            Our Partners
                        </Card.Header>
                            <Card.Body>

                                <div style={{height: '10px'}}></div>
                                <div style={{display: '200px'}}>
                                    <div>
                                        <a href = "https://apperta.org/">
                                            <img src="https://apperta.org/img/logo.png" alt="appertaLogo" style={{width:'20%'}}></img>
                                        </a>
                                        <a href = "https://code4health.org/">
                                            <img src="http://www.imsmaxims.com/wp-content/uploads/2015/09/code4health.jpg"
                                                alt="code4healthLogo" style={{width:'30%'}}></img>
                                        </a>
                                        <a href = "https://digital.nhs.uk/">
                                            <img  src="https://digital.nhs.uk/webfiles/1576854238445/images/nhs-digital-logo.svg"
                                                alt="nhsLogo" style={{width:'15%'}}></img>
                                        </a>
                                    </div>
                                    <div>
                                    <Table bordered hover>
                                        <tbody>
                                            <PartnersEntry name="Apperta Foundation"
                                                        website="https://apperta.org/"/>
                                            <PartnersEntry name="Code4Health"
                                                        website="https://code4health.org/"/>
                                            <PartnersEntry name="National Health Service (NHS) Digital"
                                                        website="https://digital.nhs.uk/"/>
                                        </tbody>
                                    </Table>
                                    </div>
                                </div>
                            </Card.Body>
                        {/* </Accordion.Collapse> */}
                    </Card>
                    {/* </Accordion> */}
                    </NHSWrapper>
                </NHSContainer>
            </div>
        );
    }
}
export default About;
