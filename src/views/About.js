import React from 'react';
import Table from 'react-bootstrap/Table';
import * as PropTypes from 'prop-types';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from '../components/react-styled-nhs/src/NHSPanel';
import NHSFooter from '../components/react-styled-nhs/src/NHSFooter';
import HeaderMenu from '../components/HeaderMenu';

function DevelopersTableEntry(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </td>
    </tr>
  );
}

DevelopersTableEntry.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

function PartnersEntry(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <a href={props.website}>{props.website}</a>
      </td>
    </tr>
  );
}

PartnersEntry.propTypes = {
  name: PropTypes.string,
  website: PropTypes.string,
};

function About() {
  return (
    <div style={{ backgroundColor: '#f0f4f5' }}>
      <HeaderMenu />
      <NHSContainer>
        <NHSWrapper>
          <h1>About Us</h1>
          <NHSPanel>
            <NHSPanelTitle>
              What Is orthoPROMS?
            </NHSPanelTitle>
            <NHSPanelBody>
              <div style={{ height: '10px' }} />
              <div style={{
                width: '90%',
                display: 'flex',
              }}
              >
                <p>
                  orthoPROMS is a web-app intended for both clinicians and patients to record
                  outcomes from orthopaedic surgeries as well as storing and visualising data using
                  openEHR standards.
                  <br />
                  <br />
                  We intend to help clinicians keep track of their patients&apos; progress
                  post-surgery while being a transparent medium for patients to see their own
                  progress. At the same time, patients are able to give feedback on how their
                  conditions after surgery that would be beneficial for both patients and clinicians
                  to determine the next step for recovery.
                  <br />
                  <br />
                  orthoPROMS is a project made by three UCL students in partnership with Apperta
                  Foundation and Code4Health.
                </p>
              </div>
            </NHSPanelBody>
          </NHSPanel>
          <NHSPanel>
            <NHSPanelTitle>
              Developers
            </NHSPanelTitle>
            <NHSPanelBody>
              <div style={{ height: '10px' }} />
              <div style={{ display: 'flex' }}>
                <Table
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th>Developers</th>
                      <th>Emails</th>
                    </tr>
                  </thead>
                  <tbody>
                    <DevelopersTableEntry
                      name="Charles Cowan"
                      email="charlie.cowan.18@ucl.ac.uk"
                    />
                    <DevelopersTableEntry
                      name="Menghang Hao"
                      email="menghang.hao.18@ucl.ac.uk"
                    />
                    <DevelopersTableEntry
                      name="Haze Al-Johary"
                      email="haziq.al-johary.18@ucl.ac.uk"
                    />
                  </tbody>
                </Table>
              </div>
            </NHSPanelBody>
          </NHSPanel>
          <NHSPanel>
            <NHSPanelTitle>
              Our Partners
            </NHSPanelTitle>
            <NHSPanelBody>

              <div style={{ height: '10px' }} />
              <div style={{ display: '200px' }}>
                <div>
                  <a href="https://apperta.org/">
                    <img
                      src="https://apperta.org/img/logo.png"
                      alt="appertaLogo"
                      style={{ width: '20%' }}
                    />
                  </a>
                  <a href="https://code4health.org/">
                    <img
                      src="http://www.imsmaxims.com/wp-content/uploads/2015/09/code4health.jpg"
                      alt="code4healthLogo"
                      style={{ width: '30%' }}
                    />
                  </a>
                </div>
                <div>
                  <Table
                    bordered
                    hover
                  >
                    <tbody>
                      <PartnersEntry
                        name="Apperta Foundation"
                        website="https://apperta.org/"
                      />
                    </tbody>
                  </Table>
                </div>
              </div>
            </NHSPanelBody>
          </NHSPanel>
        </NHSWrapper>
      </NHSContainer>
      <NHSFooter />
    </div>
  );
}

export default About;
