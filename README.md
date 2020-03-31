# orthoPROMS
Orthopaedic PROMS (Patient-record outcome measures) visualisation based on openEHR standards

[![ihaze111](https://circleci.com/gh/ihaze111/orthoPROMS/tree/master.svg?style=shield)](https://circleci.com/gh/ihaze111/orthoPROMS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ihaze111/orthoPROMS/blob/master/LICENSE)

A web-app that provides clinician and patient facing visualisations of PROMs.

<sub>orthoPROMS is the result of a University project of the COMP00016 Module at UCL. Created by Team 14 (Haze Al Johary, Charlie Cowan, and Menghang Hao).</sub>

## Getting started
These instructions can be used to run the project locally for development and testing.

### Prerequisites

- Git
- Node.js and the npm package manager
- Internet connection (even when using app, so the API calls work)
- You must clone and run the accompanying server: https://github.com/charlie-g-cowan/Comp0016-Server

### Installation

1. Clone the repository
```js
$ git clone https://github.com/ihaze111/orthoPROMS
```
2. Ensure that all submodules are pulled
```js
$ git submodule update --init --recursive
```
3. Install dependencies
```js
$ npm install
```
4. Provide a `.env` file in the format of `.env.example` and populate relevant details for CDR and whether linting should be enabled.
5. Start the application
```js
$ npm start
```
6. Navigate to `localhost:3000` on a web browser

## Testing

Tests can be run (in watch mode) with:
```js
$ npm test
```

Linting can be run with:
```js
$ npm run lint
```

## Deployment

The app must be run with `NODE_ENV=production`. The app is built with:
```js
$ npm run build
```

## Background and features
### Abstract
There is a lack of open source, easy to use Patient Recorded Outcome Measures (PROMS) visualisation and collection software. Our project is an open platform web app that visualizes patients’ progress. This will aid doctors and public health professionals in understanding the recovery of patients, and also aid patients in understanding their own recovery. The system is built as modules that can be adapted for other applications (e.g. the graphs, the survey pulled in from operational templates, etc.).

### Key features
- The web app creates visualisations on both national figures as well as individual patient's medical information appropriately based on orthopaedic Patient Recorded Outcome scores.
- Patients are able to submit a survey, giving scores on questions regarding their post-surgery experience and feed it to the Clinical Data Repository (CDR).
- The web-app is intuitive and user-friendly as much as possible.
- Access to certain features is unique to each user type e.g. access to particular patient records given to clinicians.
- The web-app is adaptable to new data structures.
- Patients are searchable by clinicians.


## Authors

Team 14 - Systems Engineering - COMP0016 - UCL Computer Science 

- [Haze Al Johary](https://github.com/ihaze111)
- [Charlie Cowan](https://github.com/charlie-g-cowan)
- [Menghang Hao](https://github.com/haomenghang)

## License

Licensed under the MIT License. See LICENSE for more details.

## Acknowledgments

Thanks to Ian McNicoll and Alan Fish for all their support.

### References
The Apperta logo is taken from the Apperta websites.
Attributions:
"public/240px-User_icon_2.svg.png": The Tango Icon Team [Public domain]
