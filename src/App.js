import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home';
import PatientSelf from './views/Patient/PatientSelf';
import PatientList from './views/Clinician/PatientList';
import PatientRecords from './views/Clinician/PatientRecords';
import Login from './views/Login';
import Register from './views/Register';
import About from './views/About';
import NationalStatistics from './views/NationalStatistics';

class App extends React.Component {
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
                <Router basename={'/'}>
                    <Route exact path="/" component={Home}/>
                    <Route path="/Login" component={Login}/>
                    <Route path="/About" component={About}/>
                    <Route path="/NationalStatistics" component={NationalStatistics}/>
                    <Route path="/Register" component={Register}/>
                    <Route path="/Patient" component={PatientSelf}/>
                    <Route path="/Clinician" component={PatientList}/>
                    <Route path="/PatientRecords" component={PatientRecords}/>
                </Router>
            </Router>
        )
    }
}

export default App;
