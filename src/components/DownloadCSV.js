import {CSVLink} from "react-csv";
import React from 'react';
import { NHSButton } from "./nhsuk-frontend-react/NHSComponents";

export function DownloadCSV(props){
    console.log(props);
    var data = [transpose(props.array)];
    console.log(data);
    return <CSVLink data={data} filename={props.fileName}><NHSButton>Export To CSV</NHSButton></CSVLink>
}

function transpose(array){
    return Object.keys(array[0]).map(function(x) {
        return array.map(function(y) { return y[x]; });
    });
}