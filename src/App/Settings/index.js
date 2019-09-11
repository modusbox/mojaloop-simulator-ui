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

import React from "react";
import { connect } from "react-redux";
import {
  Button,
  ControlIcon,
  DataList,
  Icon,
  FormInput,
  Title
} from "components";
import "./Settings.css";
import { isSameSetting } from "./funcs";
import {
  saveConfiguration,
  importConfigurations,
  exportConfigurations,
  selectConfiguration,
  removeConfiguration,
  setSettingsName,
  setSettingsProtocol,
  setSettingsHost,
  setSettingsPort
} from "./actions";
import {
  getConfigurationOptions,
  getConfigurations,
  getSettingsName,
  getSettingsProtocol,
  getSettingsHost,
  getSettingsPort,
  getSettingsConfigurationId,
  getValidationResult,
  getIsSubmitEnabled
} from "./selectors";
import { PROTOCOLS } from "./constants";

const getColumns = (configurationId, onRemove) => {
  return [
    {
      className: "icon__column-30",
      key: "",
      label: "",
      sortable: false,
      func: (_, item) => {
        return isSameSetting(item, configurationId) ? (
          <Icon size={20} name="check-small" fill="#3c9" />
        ) : null;
      }
    },
    {
      key: "name",
      label: "Name"
    },
    {
      key: "protocol",
      label: "Protocol"
    },
    {
      key: "host",
      label: "Host"
    },
    {
      key: "port",
      label: "Port"
    },
    {
      label: "",
      key: "",
      className: "icon__column-40",
      func: (_, item) => {
        const isActive = isSameSetting(item, configurationId);
        return (
          <ControlIcon
            disabled={isActive}
            icon="close-small"
            size={20}
            kind="error"
            tooltip={isActive ? "Can't delete active settings" : "Delete settings"}
            tooltipPosition="left"
            className="users__icon__delete"
            onClick={() => onRemove(item)}
          />
        );
      }
    }
  ];
};

const Settings = ({
  configurationOptions,
  configurations,
  name,
  protocol,
  host,
  port,
  configurationId,
  currentProtocol,
  currentHost,
  currentPort,
  validation,
  isSubmitEnabled,
  onExportConfigurationsClick,
  onImportConfigurationsClick,
  onConfigurationSaveClick,
  onConfigurationSelect,
  onRemoveConfigurationClick,
  onNameChange,
  onProtocolChange,
  onPortChange,
  onHostChange
}) => {
  const columns = getColumns(configurationId, onRemoveConfigurationClick);
  return (
    <div id="settings">
      <Title>Settings</Title>

      <Title small>Current setting</Title>

      <div className="settings__form">
        <div className="settings__selection__row">
          <div className="settings__selection__input">
            <FormInput
              size="l"
              type="select"
              placeholder="Configuration"
              options={configurationOptions}
              value={configurationId}
              onChange={onConfigurationSelect}
            />
          </div>
        </div>
      </div>

      <Title small>New config</Title>

      <div className="settings__form">
        <div className="settings__form-input">
          <FormInput
            type="text"
            label="Name"
            value={name}
            onChange={onNameChange}
            validation={validation.fields.name}
          />
        </div>
        <div className="settings__form-input">
          <FormInput
            type="select"
            options={PROTOCOLS}
            label="Protocol"
            value={protocol}
            onChange={onProtocolChange}
            validation={validation.fields.protocol}
          />
        </div>
        <div className="settings__form-input">
          <FormInput
            type="text"
            label="Host"
            value={host}
            onChange={onHostChange}
            validation={validation.fields.host}
          />
        </div>
        <div className="settings__form-input">
          <FormInput
            type="text"
            label="Port"
            value={port}
            onChange={onPortChange}
            validation={validation.fields.port}
          />
        </div>
        <Button
          className="settings__button__item"
          kind="primary"
          label="Save"
          disabled={!isSubmitEnabled}
          onClick={onConfigurationSaveClick}
        />
      </div>

      <Title small>All configs</Title>

      <div className="settings_list_container">
        <DataList list={configurations} columns={columns} sortColumn="Name" />
      </div>
      <Button
        className="settings__button__item settings__button__item--export"
        disabled={configurations.length === 0}
        kind="secondary"
        label="Export"
        icon="saved"
        iconPosition="right"
        noFill
        onClick={onExportConfigurationsClick}
      />
      <Button
        className="settings__button__item settings__button__item--import"
        kind="secondary"
        label="Import"
        icon="open"
        iconPosition="right"
        noFill
        onClick={onImportConfigurationsClick}
      />
    </div>
  );
};

const stateProps = state => ({
  configurationOptions: getConfigurationOptions(state),
  configurations: getConfigurations(state),
  name: getSettingsName(state),
  protocol: getSettingsProtocol(state),
  host: getSettingsHost(state),
  port: getSettingsPort(state),
  configurationId: getSettingsConfigurationId(state),
  validation: getValidationResult(state),
  isSubmitEnabled: getIsSubmitEnabled(state)
});

const actionProps = dispatch => ({
  onExportConfigurationsClick: () => dispatch(exportConfigurations()),
  onImportConfigurationsClick: () => dispatch(importConfigurations()),
  onConfigurationSaveClick: () => dispatch(saveConfiguration()),
  onConfigurationSelect: id => dispatch(selectConfiguration(id)),
  onRemoveConfigurationClick: config => dispatch(removeConfiguration(config)),
  onNameChange: value => dispatch(setSettingsName(value)),
  onProtocolChange: value => dispatch(setSettingsProtocol(value)),
  onPortChange: value => dispatch(setSettingsPort(value)),
  onHostChange: value => dispatch(setSettingsHost(value))
});

const ConnectedSettings = connect(
  stateProps,
  actionProps
)(Settings);

export default ConnectedSettings;

export { Settings };
