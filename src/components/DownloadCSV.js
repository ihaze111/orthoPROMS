import {CSVLink} from "react-csv";
import React from 'react';
import { NHSButton } from "./nhsuk-frontend-react/NHSComponents";

export function DownloadCSV(props){
    /**
     * Converts an array of arrays into .csv file
     * @param props.array of arrays used to visualise data
     * @returns a download link for .csv file containing data in csv format
     */
    var data = [transpose(props.array)];
    return <CSVLink data={data} filename={props.fileName}><NHSButton>Export To CSV</NHSButton></CSVLink>
}

function transpose(array){
    /**
     * Transpose an array of arrays to suit csv formatting
     * @param array of arrays needed to transpose
     * @returns transposed array of arrays
     */
    return Object.keys(array[0]).map(function(x) {
        return array.map(function(y) { return y[x]; });
    });
}