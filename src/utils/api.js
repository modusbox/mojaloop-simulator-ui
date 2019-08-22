import { buildFetchActions } from 'modusbox-ui-components/dist/redux-fetch';

const handleError = (error, status, state) => {
  console.log(error)
  if (status === 401) {
    window.location.assign(state.app.config.loginUrl);
    // should exit the execution of the function
    // otherwise the non-authenticated response will be
    // treater as a regular response error, causing the UI
    // to display wrong error messages
    return;
  }
  return { error, status };
};

const services = {
  test: {
    getApplicationUrl: state => {
      return 'http://localhost:3000';
    },
    getApplicationHeaders: () => undefined,
    credentials: state => undefined,
    mode: 'no-cors',
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError,
  },
  simulator: {
    getApplicationUrl: state => {
      return 'http://localhost:3002';
    },
    getApplicationHeaders: () => {
      return undefined;
    },
    credentials: state => {
      return undefined;
    },
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError,
  },
};

const endpoints = {
  parties: {
    service: services.test,
    url :'/parties'
  },
  environments: {
    service: services.simulator,
    url: '/environments',
  },
  quoteRequests: {
    service: services.simulator,
    url: () => `/quoterequests`,
  },
  
};

const apis = buildFetchActions(endpoints);
export default apis;
