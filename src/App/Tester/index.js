import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'components';
import './Tester.css';
import { initTester } from './actions';
import {
  getIsTesterLoading,
  getIsTesterLoadingFailed,
} from './selectors';


const TesterLoader = () => <Spinner center size="m" />;
const TesterError = () => <div id="app_error">There was an error while reading the environments</div>;

class Tester extends PureComponent {
  render() {
    const { ppp } = this.props;
    return (
      <div id="app">Tester</div>
    );
  }
}

const stateProps = state => ({
  isTesterLoading: getIsTesterLoading(state),
  isTesterLoadingFailed: getIsTesterLoadingFailed(state),
});
const actionProps = dispatch => ({
  initTester: () => dispatch(initTester()),
});

class TesterWrapper extends PureComponent {
  componentWillMount() {
    this.props.initTester();
  }
  render() {
    if (this.props.isTesterLoading) {
      return <TesterLoader />;
    } else if (this.props.isTesterLoadingFailed) {
      return <TesterError />;
    }
    return <Tester {...this.props} />;
  }
}

const ConnectedTester = connect(
  stateProps,
  actionProps
)(TesterWrapper);

export default ConnectedTester;

export { Tester };
