import { buildFetchActions } from "modusbox-ui-components/dist/redux-fetch";

const handleError = (error, status, state) => {
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
      const { configurations, configurationId } = state.settings;
      const [{ protocol, host, port }] = configurations.filter(
        cfg => cfg.id === configurationId
      );
      return `${protocol}://${host}:${port}`;
    },
    getApplicationHeaders: () => undefined,
    credentials: state => undefined,
    mode: "no-cors",
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError
  },
  simulator: {
    getApplicationUrl: state => {
      return "http://localhost:3002";
    },
    getApplicationHeaders: () => {
      return undefined;
    },
    credentials: state => {
      return undefined;
    },
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError
  }
};

const endpoints = {
  party: {
    service: services.test,
    url: ({ idType, idValue }) => `/repository/parties/${idType}/${idValue}`
  },
  parties: {
    service: services.test,
    url: "/repository/parties"
  },
  scenarios: {
    service: services.test,
    url: "/scenarios"
  },
  quoteRequests: {
    service: services.simulator,
    url: () => `/quoterequests`
  }
};

const apis = buildFetchActions(endpoints);
export default apis;
