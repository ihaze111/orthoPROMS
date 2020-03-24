import React from 'react';
import getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs from "../components/Queries/getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs";
import getAllEHRsInCDR from '../components/Queries/getAllEHRsInCDR';
import GenderDistributionGraph from '../components/Graphs/GenderDistributionGraph';
import AgeDistributionGraph from '../components/Graphs/AgeDistributionGraph';
import AverageScoresRange from '../components/Graphs/AverageScoresRange';
import { DownloadCSV } from "../components/DownloadCSV";

function occurrence(array){
    var result = {};
    if (array instanceof Array){
        array.forEach(function (x, i){
            if (!result[x]){
                result[x] = [i];
            }
            else{
                result[x].push(i);
            }
        });
    }
    return result;
}

class RangeEpisodeScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOp: [],
            oneWeekPostOp: [],
            sixWeeksPostOp: [],
            labels: ["Pain", "Activity limitations and support requirements", "Walking", "Walking surfaces"]
        };
    }

    componentDidMount() {
        let promise = getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs();
        promise.then((e) => {
            this.setState({ rangeEpisodeScores: e });
        });
    }

    render() {

        if (!this.state.rangeEpisodeScores) return null;
        if (this.state.rangeEpisodeScores.length !== null) {
            return <div><React.Fragment>
                <AverageScoresRange preOp={this.state.rangeEpisodeScores.preOp}
                                    oneWeek={this.state.rangeEpisodeScores.oneWeek}
                                    sixWeeks={this.state.rangeEpisodeScores.sixWeeks}
                                    label={this.state.labels}/>
                <br/><br/>
                <DownloadCSV array={[this.state.labels, this.state.rangeEpisodeScores.preOp, this.state.rangeEpisodeScores.oneWeek,
                            this.state.rangeEpisodeScores.sixWeeks]} fileName={"AverageScores.csv"}/>
                        </React.Fragment>
                    </div>
        } else {
            return <p>No reading can be found!</p>
        }
    }
}

export function RangeEpisodeScoresGraph() {
    return <div><RangeEpisodeScores/></div>
}

class GenderDistribution extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            admin_genders: [],
            labels: ["Male", "Female", "Not Defined"]
        };
    }

    componentDidMount(){
        let promise = getAllEHRsInCDR();
        let genderList = [];
        promise.then((e) => {
            for (var i = 0; i < e.length; i++){
                genderList[i] = e[i].gender;
            }
        });
        this.setState({genders : genderList});
    }

    occurrence = (array) => {
        var result = {};

        if (array instanceof Array){
            array.forEach(function (x, i){
                if (!result[x]){
                    result[x] = [i];
                }
                else{
                    result[x].push(i);
                }
            });
        }
        return result;
    }


    pushIntoArray(props){
        this.state.admin_genders.push(props);
    }

    render(){
        if (!this.state.genders){return null}
        if (this.state.genders.length > 0){
            let male = occurrence(this.state.genders)["Male"].length;
            let female = occurrence(this.state.genders)["Female"].length;
            let unknown = occurrence(this.state.genders)[""].length;
            this.pushIntoArray(male);
            this.pushIntoArray(female);
            this.pushIntoArray(unknown);
            return <div><React.Fragment><GenderDistributionGraph title={"Gender Distribution"}
                                            genderDistribution={this.state.admin_genders}
                                            labels={this.state.labels}/>
                        <br/><br/>
                        <DownloadCSV array={[this.state.labels, this.state.admin_genders]} fileName={"GenderDistribution.csv"}/>
                        </React.Fragment>
                    </div>
        }else{
            return <p>No data obtained</p>
        }
    }
}

export function GenderDistributeGraph(){
    return <div><GenderDistribution/></div>
}

class AgeDistribution extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ageDistributed: [],
            labels: ["Under 18","18-35","36-53","54-71","72-90",
            "Over 90"]
        };
    }

    componentDidMount(){
        let promise = getAllEHRsInCDR();
        let ageList = [];
        promise.then((e) => {
            for (var i = 0; i < e.length; i++){
                if(e[i].birthYear !== ""){
                    ageList.push(this.calculateAge(e[i].birthYear));
                }
            }
        });
        this.setState({ages : ageList});
    }

    calculateAge(birthDate){
        const result = Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        return result;
    }

    pushIntoArray(props){
        this.state.ageDistributed.push(props);
    }

    pushIntoCategories(array){
        let minor = [];
        let youngAdults = [];
        let adults = [];
        let olderAdults = [];
        let seniors = [];
        let legends = [];
        for (var i = 0; i < array.length; i++){
            if ((array[i] > -1) && (array[i] <= 17)){
                minor.push(array[i]);
            }
            else if ((array[i] > 17) && (array[i] <= 35)){
                youngAdults.push(array[i]);
            }
            else if ((array[i] > 35) && (array[i] <= 53)){
                adults.push(array[i]);
            }
            else if ((array[i] > 53) && (array[i] <= 71)){
                olderAdults.push(array[i]);
            }
            else if ((array[i] > 71) && (array[i] <= 90)){
                seniors.push(array[i]);
            }
            else if (array[i] > 90){
                legends.push(array[i]);
            }
        }
        let minorCount = minor.length;
        let youngAdultsCount = youngAdults.length;
        let adultsCount = adults.length;
        let olderAdultsCount = olderAdults.length;
        let seniorsCount = seniors.length;
        let legendsCount = legends.length;
        this.pushIntoArray(minorCount);
        this.pushIntoArray(youngAdultsCount);
        this.pushIntoArray(adultsCount);
        this.pushIntoArray(olderAdultsCount);
        this.pushIntoArray(seniorsCount);
        this.pushIntoArray(legendsCount);
        return this.state.ageDistributed
    }

    averageAge(array){
        let sum = array.reduce((a,b) => a + b, 0);
        let average = sum/(array.length);
        return average;
    }

    render(){

        if (!this.state.ages){return null}
        if (this.state.ages.length > 0){
            let distribution = this.pushIntoCategories(this.state.ages);
            return <React.Fragment><div><p style={{fontSize: 20}}><strong>Average Age : {Math.round(this.averageAge(this.state.ages))} Years Old</strong></p></div>
                        <AgeDistributionGraph title={"Age Distribution"}
                                ageDistribute={distribution}
                                labels={this.state.labels}/>
                    <br/><br/>
                    <DownloadCSV array={[this.state.labels, distribution]} fileName={"AgeDistribution.csv"}/>    
                    </React.Fragment>
        }else{
            return <p>No data obtained</p>
        }
    }
}

export function AgeDistributeGraph(){
    return <div><AgeDistribution/></div>
}
