import { createAction } from "redux-actions";

export const RESET_SETTINGS = "Settings / Set Is Loading";
export const SET_SETTINGS_HOST = "Settings / Set Host";
export const SET_SETTINGS_PORT = "Settings / Set Port";

export const resetSettings = createAction(RESET_SETTINGS);
export const setSettingsHost = createAction(SET_SETTINGS_HOST);
export const setSettingsPort = createAction(SET_SETTINGS_PORT);

export const initSettings = () => async (dispatch, getState) => {};
