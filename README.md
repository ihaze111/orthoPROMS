# orthoPROMS

[![ihaze111](https://circleci.com/gh/ihaze111/orthoPROMS/tree/master.svg?style=shield)](https://circleci.com/gh/ihaze111/orthoPROMS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ihaze111/orthoPROMS/blob/master/LICENSE)

 ## Orthopaedic PROMS (Patient-record outcome measures) visualisation based on openEHR standards.

### Abstract
There is a lack of open source, easy to use Patient Recorded Outcome Measures (PROMS) visualisation and collection software. Our project is an open platform web app that visualizes patients’ progress. This will aid doctors and public health professionals in understanding the recovery of patients, and also aid patients in understanding their own recovery. The system is built as modules that can be adapted for other applications (e.g. the graphs, the survey pulled in from operational templates, etc.).

## Key features
- The web app creates visualisations on both national figures as well as individual patient's medical information appropriately based on orthopaedic Patient Recorded Outcome scores.
- Patients are able to submit a survey, giving scores on questions regarding their post-surgery experience and feed it to the Clinical Data Repository (CDR).
- The web-app is intuitive and user-friendly as much as possible.
- Access to certain features is unique to each user type e.g. access to particular patient records given to clinicians.
- The web-app is adaptable to new data structures.
- Patients are searchable by clinicians.

## Dependencies / Requirements

- You must be connected to the Internet (even when using app, so the API calls work)
- You must clone and run the accompanying server: https://github.com/charlie-g-cowan/Comp0016-Server

## Installation

1. Run `npm install`
2. Run `npm start`
3. Navigate to `localhost:3000` on a web browser


References:
The Apperta logo is taken from the Apperta websites.
Attributions:
"public/240px-User_icon_2.svg.png": The Tango Icon Team [Public domain]
