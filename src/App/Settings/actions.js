import { createAction } from "redux-actions";
import { downloadFile } from "utils/html";

export const RESET_SETTINGS = "Settings / Set Is Loading";
export const SELECT_CONFIGURATION = "Settings / Select Configuration";
export const REMOVE_CONFIGURATION = "Settings / Remove Configuration";
export const SAVE_SETTINGS_CONFIGURATION = "Settings / Save Configuration";
export const SET_SETTINGS_PROTOCOL = "Settings / Set Protocol";
export const SET_SETTINGS_HOST = "Settings / Set Host";
export const SET_SETTINGS_PORT = "Settings / Set Port";

export const resetSettings = createAction(RESET_SETTINGS);
export const selectConfiguration = createAction(SELECT_CONFIGURATION);
export const removeConfiguration = createAction(REMOVE_CONFIGURATION);
export const saveConfiguration = createAction(SAVE_SETTINGS_CONFIGURATION);
export const setSettingsProtocol = createAction(SET_SETTINGS_PROTOCOL);
export const setSettingsHost = createAction(SET_SETTINGS_HOST);
export const setSettingsPort = createAction(SET_SETTINGS_PORT);

export const initSettings = () => async (dispatch, getState) => {};

export const exportConfigurations = () => (dispatch, getState) => {
  const configurations = getState().settings.configurations;
  const jsonFile = JSON.stringify(configurations, null, 2);
  downloadFile(jsonFile, "scenarios.json");
};
