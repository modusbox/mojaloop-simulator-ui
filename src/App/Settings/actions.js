/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { createAction } from "redux-actions";
import { downloadFile, loadFile } from "utils/html";

export const RESET_SETTINGS = "Settings / Set Is Loading";
export const SET_CONFIGURATIONS = "Settings / Set Configurations";
export const SELECT_CONFIGURATION = "Settings / Select Configuration";
export const REMOVE_CONFIGURATION = "Settings / Remove Configuration";
export const SAVE_SETTINGS_CONFIGURATION = "Settings / Save Configuration";
export const SET_SETTINGS_NAME = "Settings / Set Name";
export const SET_SETTINGS_PROTOCOL = "Settings / Set Protocol";
export const SET_SETTINGS_HOST = "Settings / Set Host";
export const SET_SETTINGS_PORT = "Settings / Set Port";
export const SET_SETTINGS_PATH = "Settings / Set Path";

export const resetSettings = createAction(RESET_SETTINGS);
export const selectConfiguration = createAction(SELECT_CONFIGURATION);
export const removeConfiguration = createAction(REMOVE_CONFIGURATION);
export const saveConfiguration = createAction(SAVE_SETTINGS_CONFIGURATION);
export const setConfigurations = createAction(SET_CONFIGURATIONS);
export const setSettingsName = createAction(SET_SETTINGS_NAME);
export const setSettingsProtocol = createAction(SET_SETTINGS_PROTOCOL);
export const setSettingsHost = createAction(SET_SETTINGS_HOST);
export const setSettingsPort = createAction(SET_SETTINGS_PORT);
export const setSettingsPath = createAction(SET_SETTINGS_PATH);

export const initSettings = () => async (dispatch, getState) => {};

export const exportConfigurations = () => (dispatch, getState) => {
  const configurations = getState().settings.configurations;
  const jsonFile = JSON.stringify(configurations, null, 2);
  downloadFile(jsonFile, "settings.json");
};

export const importConfigurations = () => async (dispatch, getState) => {
  const isConfiguration = conf =>
    conf.id && conf.name && conf.host && conf.port && conf.protocol;
  try {
    const txt = await loadFile(".json");
    const json = JSON.parse(txt);

    if (json.length && json.every(isConfiguration)) {
      dispatch(setConfigurations(json));
      dispatch(selectConfiguration(json[0].id));
    } else {
      throw new Error("Configuration corrupted");
    }
  } catch (e) {
    alert(`Unable to import file.\nReason: ${e.message}`);
  }
};
