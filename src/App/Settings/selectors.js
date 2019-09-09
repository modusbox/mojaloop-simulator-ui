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
export const getSettingsConfigurationId = state => state.settings.configurationId;

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
  (name, protocol, host, port) => ({ name, protocol, host, port })
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
  configs => configs.map(config => ({
    label: `${config.name} - ${config.protocol}://${config.host}:${config.port}`,
    value: config.id
  }))
);