import { createAction } from "redux-actions";
import { downloadFile } from "utils/html";

export const RESET_SETTINGS = "Settings / Set Is Loading";
export const SET_CONFIGURATIONS = "Settings / Set Configurations";
export const SELECT_CONFIGURATION = "Settings / Select Configuration";
export const REMOVE_CONFIGURATION = "Settings / Remove Configuration";
export const SAVE_SETTINGS_CONFIGURATION = "Settings / Save Configuration";
export const SET_SETTINGS_NAME = "Settings / Set Name";
export const SET_SETTINGS_PROTOCOL = "Settings / Set Protocol";
export const SET_SETTINGS_HOST = "Settings / Set Host";
export const SET_SETTINGS_PORT = "Settings / Set Port";

export const resetSettings = createAction(RESET_SETTINGS);
export const selectConfiguration = createAction(SELECT_CONFIGURATION);
export const removeConfiguration = createAction(REMOVE_CONFIGURATION);
export const saveConfiguration = createAction(SAVE_SETTINGS_CONFIGURATION);
export const setConfigurations = createAction(SET_CONFIGURATIONS);
export const setSettingsName = createAction(SET_SETTINGS_NAME);
export const setSettingsProtocol = createAction(SET_SETTINGS_PROTOCOL);
export const setSettingsHost = createAction(SET_SETTINGS_HOST);
export const setSettingsPort = createAction(SET_SETTINGS_PORT);

export const initSettings = () => async (dispatch, getState) => {};

export const exportConfigurations = () => (dispatch, getState) => {
  const configurations = getState().settings.configurations;
  const jsonFile = JSON.stringify(configurations, null, 2);
  downloadFile(jsonFile, "settings.json");
};

export const importConfigurations = () => (dispatch, getState) => {
  const onChange = cb => async e => {
    const readAsText = file => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
      });
    };
    try {
      const [file] = e.target.files;
      if (!file) {
        return;
      }
      const txt = await readAsText(file);
      const json = JSON.parse(txt);

      if (
        json.length &&
        json.every(
          conf =>
            conf.id && conf.name && conf.host && conf.port && conf.protocol
        )
      ) {
        dispatch(setConfigurations(json));
        dispatch(selectConfiguration(json[0].id));
      } else {
        throw new Error("Configuration corrupted");
      }
    } catch (e) {
      alert(`Unable to import file.\nReason: ${e.message}`);
    }
    cb();
  };
  const input = document.createElement("input");
  const remove = () => input.parentNode.removeChild(input);

  document.body.append(input);
  input.setAttribute("type", "file");
  input.addEventListener("change", onChange(remove));
  input.click();
};
