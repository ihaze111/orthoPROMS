import React from 'react';
import RadarGraph from '../components/Graphs/RadarGraph';
import getRangeEpisodeScores from "../components/Queries/GetRangeEpisodeScores";
import getEHRs from '../components/Queries/GetEHRs';
import PieChart from '../components/Graphs/PieChart';

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
        let promise = getRangeEpisodeScores();
        promise.then((e) => {
            this.setState({ rangeEpisodeScores: e });
        });
    }

    render() {

        if (!this.state.rangeEpisodeScores) return null;
        if (this.state.rangeEpisodeScores.length !== null) {
            return <RadarGraph preOp={this.state.rangeEpisodeScores.preOp}
                               oneWeek={this.state.rangeEpisodeScores.oneWeek}
                               sixWeeks={this.state.rangeEpisodeScores.sixWeeks}
                               label={this.state.labels}/>
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
            admin_genders: []
        };
    }

    componentDidMount(){
        let promise = getEHRs();
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
            return <PieChart title={"Gender Distribution"}
                                genderDistribution={this.state.admin_genders}
                                labels={["Male", "Female", "Not Defined"]}/>
        }else{
            return <p>No data obtained</p>
        }
    }
}

export function GenderDistributionGraph(){
    return <div><GenderDistribution/></div>
}

class AgeDistribution extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ageDistributed: []
        };
    }

    componentDidMount(){
        let promise = getEHRs();
        let ageList = [];
        promise.then((e) => {
            console.log(e);
            for (var i = 0; i < e.length; i++){
                ageList[i] = this.calculateAge(e[i].birthYear);
            }
        });
        const sortedAgeList = ageList.sort((a, b) => a - b);
        this.setState({ages : sortedAgeList});
    }

    calculateAge(birthDate){
        const result = Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        return result;
    }

    pushIntoArray(props){
        this.state.ageDistributed.push(props);
    }

    render(){
        console.log(this.state.ages);
        return <p>There's still work to be done</p>
        // if (!this.state.genders){return null}
        // if (this.state.genders.length > 0){
        //     let bi = occurrence(sd)
        //     let male = this.occurrence(this.state.genders)["Male"].length;
        //     let female = this.occurrence(this.state.genders)["Female"].length;
        //     let unknown = this.occurrence(this.state.genders)[""].length;
        //     this.pushIntoArray(male);
        //     this.pushIntoArray(female);
        //     this.pushIntoArray(unknown);
        //     return <PieChart title={"Gender Distribution"}
        //                         genderDistribution={this.state.admin_genders}
        //                         labels={["Male", "Female", "Not Defined"]}/>
        // }else{
        //     return <p>No data obtained</p>
        // }
    }
}

export function AgeDistributionGraph(){
    return <div><AgeDistribution/></div>
}