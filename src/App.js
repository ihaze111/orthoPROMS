/**
 * @file Entry page for routing pages of the orthoPROMS application
 * @author Charlie Cowan, Haze Al-Johary, Menghang Hao.
 */
import React from 'react';
import Script from 'react-load-script';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';
import PatientSelf from './views/Patient';
import PatientList from './views/Clinician';
import PatientRecords from './views/PatientRecords';
import Login from './views/Login';
import Register from './views/Register';
import About from './views/About';
import Reset from './views/Reset';
import NationalStatistics from './views/NationalStatistics';
import 'nhsuk-frontend/dist/nhsuk.min';
import 'nhsuk-frontend/packages/nhsuk.scss';
import { Composition } from './views/Composition';

/**
 * Initial entry to the app, routes to individual pages
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.startApp = () => {
      const { gapi } = window;
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '435425463824-lso8p4egc7hasvbkrbff4h60g60se5l3.apps.googleusercontent.com',
        })
          .then((res) => {
            // TODO: replace this
            console.log(res);
          });
      });
    };
  }

  render() {
    return (
      <Router>
        {/* Here we import Bootstrap for things such as tab features. See their site here: https://getbootstrap.com/ */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <script src="http://cdn.highcharts.com.cn/highcharts/highcharts.js" />
        <Script
          url="https://apis.google.com/js/platform.js"
          onLoad={this.handleScriptLoad}
        />
        <Router basename="/">
          <Route path="/About" component={About} />
          <Route path="/Clinician" component={PatientList} />
          <Route path="/Composition" component={Composition} />
          <Route exact path="/" component={Home} />
          <Route path="/Login" component={Login} />
          <Route path="/NationalStatistics" component={NationalStatistics} />
          <Route path="/Patient" component={PatientSelf} />
          <Route path="/PatientRecords" component={PatientRecords} />
          <Route path="/Register" component={Register} />
          <Route path="/Reset" component={Reset} />
        </Router>
      </Router>
    );
  }
}

export default App;
