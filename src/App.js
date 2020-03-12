import React from 'react';
import Script from 'react-load-script'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';
import PatientSelf from './views/Patient/PatientSelf';
import PatientList from './views/Clinician/PatientList';
import PatientRecords from './views/Clinician/PatientRecords';
import Login from './views/Login';
import Register from './views/Register';
import About from './views/About';
import Reset from './views/Reset';


class App extends React.Component {

    startApp = () => {
        let gapi = window.gapi;
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '435425463824-lso8p4egc7hasvbkrbff4h60g60se5l3.apps.googleusercontent.com'
            }).then(res => {
                console.log(res)
            })
        })
    };

    componentDidMount() {
        // this.startApp
    }

    handleScriptLoad = () => {
        // this.startApp()
    }

    render() {
        return (

            <Router>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />
                <script src="http://cdn.highcharts.com.cn/highcharts/highcharts.js"></script>
                <Script
                    url="https://apis.google.com/js/platform.js"
                    onLoad={this.handleScriptLoad}
                />
                <Router basename={'/'}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/About" component={About}/>
                    <Route path="/Register" component={Register}/>
                    <Route path="/Patient" component={PatientSelf}/>
                    <Route path="/Clinician" component={PatientList}/>
                    <Route path="/PatientRecords" component={PatientRecords}/>
                    <Route path="/Reset" component={Reset}/>
                </Router>
            </Router>
        )
    }
}

export default App;
