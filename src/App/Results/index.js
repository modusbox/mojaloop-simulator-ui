import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import './Results.css';
import { initResults } from './actions';
import {
  getIsResultsLoading,
  getIsResultsLoadingFailed,
} from './selectors';


const ResultsLoader = () => <Spinner center size="m" />;
const ResultsError = () => <div id="app_error">There was an error while reading the environments</div>;

class Results extends PureComponent {
  render() {
    const { ppp } = this.props;
    return (
      <div id="app">Results</div>
    );
  }
}

const stateProps = state => ({
  isResultsLoading: getIsResultsLoading(state),
  isResultsLoadingFailed: getIsResultsLoadingFailed(state),
});
const actionProps = dispatch => ({
  initResults: () => dispatch(initResults()),
});

class ResultsWrapper extends PureComponent {
  componentWillMount() {
    this.props.initResults();
  }
  render() {
    if (this.props.isResultsLoading) {
      return <ResultsLoader />;
    } else if (this.props.isResultsLoadingFailed) {
      return <ResultsError />;
    }
    return <Results {...this.props} />;
  }
}

const ConnectedResults = connect(
  stateProps,
  actionProps
)(ResultsWrapper);

export default ConnectedResults;

export { Results };
