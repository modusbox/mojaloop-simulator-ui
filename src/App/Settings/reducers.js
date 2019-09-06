import { setItem, getItem, removeItem } from "utils/storage";
import { handleActions } from "redux-actions";
import findIndex from "lodash/findIndex";
import {
  RESET_SETTINGS,
  SELECT_CONFIGURATION,
  REMOVE_CONFIGURATION,
  SAVE_SETTINGS_CONFIGURATION,
  SET_SETTINGS_PROTOCOL,
  SET_SETTINGS_HOST,
  SET_SETTINGS_PORT
} from "./actions";

const isSameItem = (item, protocol, host, port) =>
  item.protocol === protocol && item.host === host && item.port === port;

const initialConfigurationState = [
  {
    protocol: "http",
    host: "localhost",
    port: "3003"
  }
];
let configs = getItem("configurations");
let currentProtocol = getItem("currentProtocol");
let currentHost = getItem("currentHost");
let currentPort = getItem("currentPort");

if (!configs || !configs.length) {
  removeItem("configurations");
  configs = initialConfigurationState;
}

if (
  !configs.some(item => {
    return isSameItem(item, currentProtocol, currentHost, currentPort);
  })
) {
  removeItem("currentProtocol");
  removeItem("currentHost");
  removeItem("currentPort");
  currentProtocol = configs[0].protocol;
  currentHost = configs[0].host;
  currentPort = configs[0].port;
}

const initialState = {
  configurations: configs,
  protocol: undefined,
  host: undefined,
  port: undefined,
  currentProtocol,
  currentHost,
  currentPort
};

const Settings = handleActions(
  {
    [RESET_SETTINGS]: (state, action) => ({
      ...initialState
    }),
    [SAVE_SETTINGS_CONFIGURATION]: (state, action) => {
      const newState = {
        ...state,
        configurations: [
          ...state.configurations,
          {
            protocol: state.protocol,
            host: state.host,
            port: state.port
          }
        ],
        protocol: "",
        host: "",
        port: ""
      };
      setItem("configurations", newState.configurations);
      return newState;
    },
    [SELECT_CONFIGURATION]: (state, action) => {
      const newState = {
        ...state,
        currentProtocol: action.payload.protocol,
        currentHost: action.payload.host,
        currentPort: action.payload.port
      };
      setItem("currentProtocol", newState.currentProtocol);
      setItem("currentHost", newState.currentHost);
      setItem("currentPort", newState.currentPort);

      return newState;
    },
    [REMOVE_CONFIGURATION]: (state, action) => {
      const index = findIndex(state.configurations, action.payload);
      const newState = {
        ...state,
        configurations: [
          ...state.configurations.slice(0, index),
          ...state.configurations.slice(index + 1)
        ]
      };
      setItem("configurations", newState.configurations);
      return newState;
    },
    [SET_SETTINGS_PROTOCOL]: (state, action) => ({
      ...state,
      protocol: action.payload
    }),
    [SET_SETTINGS_HOST]: (state, action) => ({
      ...state,
      host: action.payload
    }),
    [SET_SETTINGS_PORT]: (state, action) => ({
      ...state,
      port: action.payload
    })
  },
  initialState
);

export default Settings;
export { initialState };
