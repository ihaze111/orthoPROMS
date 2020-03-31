import { CSVLink } from 'react-csv';
import React from 'react';
import * as PropTypes from 'prop-types';
import { NHSButton } from '../react-styled-nhs/src/NHSComponents';

/**
 * Transpose an array of arrays to suit csv formatting
 * @param array of arrays needed to transpose
 * @returns transposed array of arrays
 */
export function transpose(array) {
  return Object.keys(array[0])
    .map((x) => array.map((y) => y[x]));
}

/**
 * Converts an array of arrays into .csv file
 * @param props.array of arrays used to visualise data
 * @returns a download link for .csv file containing data in csv format
 */
export function DownloadCSV(props) {
  const data = [transpose(props.array)];
  return (
    <CSVLink data={data} filename={props.fileName}>
      <NHSButton>Export To CSV</NHSButton>
    </CSVLink>
  );
}

DownloadCSV.propTypes = {
  array: PropTypes.arrayOf(PropTypes.array),
  fileName: PropTypes.string,
};
