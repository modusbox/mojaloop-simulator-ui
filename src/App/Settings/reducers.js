import { handleActions } from "redux-actions";
import uuid from "uuid/v4";
import { setItem, getItem, removeItem } from "utils/storage";
import findIndex from "lodash/findIndex";
import {
  RESET_SETTINGS,
  SET_CONFIGURATIONS,
  SELECT_CONFIGURATION,
  REMOVE_CONFIGURATION,
  SAVE_SETTINGS_CONFIGURATION,
  SET_SETTINGS_NAME,
  SET_SETTINGS_PROTOCOL,
  SET_SETTINGS_HOST,
  SET_SETTINGS_PORT
} from "./actions";

const initialConfigurationState = [
  {
    id: "00000000",
    name: "default",
    protocol: "http",
    host: "localhost",
    port: "3003"
  }
];
let configs = getItem("configurations");
let configurationId = getItem("configurationId");

if (!configs || !configs.length) {
  removeItem("configurations");
  configs = initialConfigurationState;
}

if (!configs.some(item => item.id === configurationId)) {
  removeItem("configurationId");
  configurationId = configs[0].id;
}

const initialState = {
  configurations: configs,
  name: undefined,
  protocol: undefined,
  host: undefined,
  port: undefined,
  configurationId
};

const Settings = handleActions(
  {
    [RESET_SETTINGS]: (state, action) => ({
      ...initialState
    }),
    [SET_CONFIGURATIONS]: (state, action) => {
      setItem("configurations", action.payload);
      return {
        ...state,
        configurations: action.payload
      };
    },
    [SAVE_SETTINGS_CONFIGURATION]: (state, action) => {
      const newState = {
        ...state,
        configurations: [
          ...state.configurations,
          {
            id: uuid(),
            name: state.name,
            protocol: state.protocol,
            host: state.host,
            port: state.port
          }
        ],
        name: "",
        protocol: "",
        host: "",
        port: ""
      };
      setItem("configurations", newState.configurations);
      return newState;
    },
    [SELECT_CONFIGURATION]: (state, action) => {
      setItem("configurationId", action.payload);
      return {
        ...state,
        configurationId: action.payload
      };
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
    [SET_SETTINGS_NAME]: (state, action) => ({
      ...state,
      name: action.payload
    }),
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
