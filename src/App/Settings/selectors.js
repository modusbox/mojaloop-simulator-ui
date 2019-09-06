import { createSelector } from "reselect";
import { toValidationResult, getIsValid } from "modusbox-ui-components/dist/redux-validation";
import { getSettingsValidators } from './validators';

export const getConfigurations = state => state.settings.configurations;
export const getSettingsProtocol = state => state.settings.protocol;
export const getSettingsHost = state => state.settings.host;
export const getSettingsPort = state => state.settings.port;
export const getCurrentSettingsProtocol = state => state.settings.currentProtocol;
export const getCurrentSettingsHost = state => state.settings.currentHost;
export const getCurrentSettingsPort = state => state.settings.currentPort;

const buildSetting = (protocol, host, port) => ({ protocol, host, port });

const getSetting = createSelector(
  getSettingsProtocol,
  getSettingsHost,
  getSettingsPort,
  buildSetting
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