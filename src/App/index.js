import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spinner } from 'components';
import SuccessToast from './SuccessToast';
import ErrorModal from './ErrorModal';
import './App.css';

import { initApp, hideErrorModal } from './actions';
import {
  getIsAppLoading,
  getIsAppLoadingFailed,
  getIsSuccessToastVisible,
  getIsErrorModalVisible,
  getErrorModalContent,
} from './selectors';

const AppLoader = () => <Spinner center size="m" />;
const AppError = () => <div id="app_error">There was an error while reading the environments</div>;

class App extends PureComponent {
  render() {
    const {
      isSuccessToastVisible,
      isErrorModalVisible,
      errorModalContent,
      onCloseErrorModal,
    } = this.props;
    return (
      <div id="app">
        <div id="app__navbar">
        </div>
        <div id="app__content">
          <Route path="/" exact component={() => <AppLoader />} />
        </div>
        <SuccessToast isVisible={isSuccessToastVisible} />
        <ErrorModal isVisible={isErrorModalVisible} content={errorModalContent} onClose={onCloseErrorModal} />
      </div>
    );
  }
}

const stateProps = state => ({
  isAppLoading: getIsAppLoading(state),
  isAppLoadingFailed: getIsAppLoadingFailed(state),
  isSuccessToastVisible: getIsSuccessToastVisible(state),
  isErrorModalVisible: getIsErrorModalVisible(state),
  errorModalContent: getErrorModalContent(state),
});
const actionProps = dispatch => ({
  initApp: () => dispatch(initApp()),
  onCloseErrorModal: () => dispatch(hideErrorModal()),
});

class AppWrapper extends PureComponent {
  componentWillMount() {
    this.props.initApp();
  }
  render() {
    if (this.props.isAppLoading) {
      return <AppLoader />;
    } else if (this.props.isAppLoadingFailed) {
      return <AppError />;
    }
    return <App {...this.props} />;
  }
}

const ConnectedApp = connect(
  stateProps,
  actionProps
)(AppWrapper);

export default ConnectedApp;

export { App };
