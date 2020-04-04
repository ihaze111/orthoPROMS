import React from 'react';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import * as PropTypes from 'prop-types';
import HeaderMenu from '../components/HeaderMenu';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import { handleCliniSearch } from '../actions/clinicianActions';
import 'rc-pagination/assets/index.css';
import { PatientListTable } from '../components/Clinician/PatientListTable/PatientListTable';

/**
 * Clinician page (patient list)
 */
class Clinician extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (e) => {
      this.props.handleCliniSearch(e.target.value);
    };
  }

  render() {
    const { search } = this.props;
    return (
      <div style={{ fontFamily: 'Arial, Sans-serif' }}>
        <HeaderMenu />
        <NHSContainer>
          <NHSWrapper>
            <h1>
              Patient List
              <Form
                inline
                style={{ float: 'right' }}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={this.onChange}
                  className="mr-sm-2"
                />
              </Form>
            </h1>
            <PatientListTable />
          </NHSWrapper>
        </NHSContainer>
      </div>
    );
  }
}

Clinician.propTypes = {
  handleCliniSearch: PropTypes.func,
  search: PropTypes.string,
};

export default connect(
  (state) => ({
    search: state.clinician.search,
  }),
  {
    handleCliniSearch,
  },
)(Clinician);
