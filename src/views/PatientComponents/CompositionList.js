import React from 'react';
import getAllCompositionsByEHRId from '../../components/Queries/getAllCompositionsByEHRId';
import PatientProgressTableEntry from './PatientProgressTableEntry';
import { NHSTd, NHSTr } from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import Pagination from 'rc-pagination';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCompositions } from '../../actions/appActions';

export class Composition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      List: [],
    };
  }

  componentDidMount() {
    const promise = getAllCompositionsByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.props.setCompositions(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    const Lists = nextProps.compositionsFiltered;
    this.setState({
      List: (Lists || []).slice(0, 10),
    });
  }

  handlePageChange(e) {
    const { compositionsFiltered } = this.props;
    this.setState({
      page: e,
      List: e >= 1 ? compositionsFiltered.slice((e - 1) * 10, e * 10)
        : compositionsFiltered.slice(0, 10),
    });
  }

  render() {
    const { compositionsFiltered } = this.props;
    const { List } = this.state;
    if (!compositionsFiltered) return null;
    if (compositionsFiltered.length > 0) {
      return (
        <>
          {
            List.map((e, index) => {
              e.index = index;
              return PatientProgressTableEntry(e);
            })
          }
          <NHSTr key="paginationRow">
            <NHSTd
              colSpan="5"
              key="paginationCell"
            >
              <Pagination
                current={this.state.page}
                total={compositionsFiltered.length}
                onChange={this.handlePageChange.bind(this)}
              />
            </NHSTd>
          </NHSTr>
        </>
      );
    }
    return (
      <NHSTr key="noCompositionsRow">
        <NHSTd
          key="noCompositionsData"
          colSpan="5"
        >
          No compositions were found
        </NHSTd>
      </NHSTr>
    );
  }
}

Composition.propTypes = {
  ehrId: PropTypes.string,
  setCompositions: PropTypes.func,
  compositionsFiltered: PropTypes.arrayOf(PropTypes.object),
};

export const Compositions = connect(
  (state) => ({
    compositionsFiltered: state.app.compositionsFiltered,
  }),
  {
    setCompositions,
  },
)(Composition);
