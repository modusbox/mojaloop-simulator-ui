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

import { createSelector } from "reselect";
import find from "lodash/find";
import {
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getSettingsValidators } from "./validators";

export const getConfigurations = state => state.settings.configurations;
export const getSettingsName = state => state.settings.name;
export const getSettingsProtocol = state => state.settings.protocol;
export const getSettingsHost = state => state.settings.host;
export const getSettingsPort = state => state.settings.port;
export const getSettingsPath = state => state.settings.path;
export const getSettingsConfigurationId = state =>
  state.settings.configurationId;

export const getSettingsCurrentConfiguration = createSelector(
  getConfigurations,
  getSettingsConfigurationId,
  (configuratios, id) => find(configuratios, { id })
);

const getSetting = createSelector(
  getSettingsName,
  getSettingsProtocol,
  getSettingsHost,
  getSettingsPort,
  getSettingsPath,
  (name, protocol, host, port, path) => ({ name, protocol, host, port, path })
);

export const getValidationResult = createSelector(
  getSetting,
  getSettingsValidators,
  toValidationResult
);

export const getIsSubmitEnabled = createSelector(
  getValidationResult,
  getIsValid
);

export const getConfigurationOptions = createSelector(
  getConfigurations,
  configs =>
    configs.map(config => ({
      label: `${config.name} - ${config.protocol}://${config.host}:${
        config.port
      }${config.path || ""}`,
      value: config.id
    }))
);
