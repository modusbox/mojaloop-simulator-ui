import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, ControlIcon, DataList, Icon, FormInput, Title } from "components";
import "./Settings.css";
import {
  saveConfiguration,
  exportConfigurations,
  selectConfiguration,
  removeConfiguration,
  setSettingsProtocol,
  setSettingsHost,
  setSettingsPort,
} from "./actions";
import {
  getConfigurations,
  getSettingsProtocol,
  getSettingsHost,
  getSettingsPort,
  getCurrentSettingsProtocol,
  getCurrentSettingsHost,
  getCurrentSettingsPort,
  getValidationResult,
  getIsSubmitEnabled,
} from "./selectors";
import { PROTOCOLS } from './constants';

const getColumns = (
  currentProtocol,
  currentHost,
  currentPort,
  onRemove
) => {
  const isSameItem = (item, protocol, host, port) => 
    item.protocol === protocol &&
    item.host === host &&
    item.port === port;

  return [
    {

      sortable: false,
      func: (_,item) => {
        const isSame = isSameItem(item, currentProtocol, currentHost, currentPort);
        return isSame ? <Icon size={20} name="check-small" fill="#3c9" /> : null;
      }
    },
    {
      key: 'protocol',
      label: 'Protocol', 
    },
    {
      key: 'host',
      label: 'Host', 
    },
    {
      key: 'port',
      label: 'Port', 
    },
    {
      label: "",
      key: "",
      className: "icon__column-40",
      func: (_, item) => (
        <ControlIcon
          disabled={isSameItem(item, currentProtocol, currentHost, currentPort)}
          icon="close-small"
          size={20}
          className="users__icon__delete"
          onClick={() => onRemove(item)}
        />
      )
    }
  ]
}
class Settings extends PureComponent {
  render() {
    const columns = getColumns(
      this.props.currentProtocol,
      this.props.currentHost,
      this.props.currentPort,
      this.props.onRemoveConfigurationClick
    );
    return (
      <div id="settings">
        <Title>Settings</Title>

        <div className="settings__form">
          <div className="settings__form-input">
            <FormInput
              type="select"
              options={PROTOCOLS}
              label="Protocol"
              value={this.props.protocol}
              onChange={this.props.onProtocolChange}
              validation={this.props.validation.fields.protocol}
            />
          </div>
          <div className="settings__form-input">
            <FormInput
              type="text"
              label="Host"
              value={this.props.host}
              onChange={this.props.onHostChange}
              validation={this.props.validation.fields.host}
            />
          </div>
          <div className="settings__form-input">
            <FormInput
              type="text"
              label="Port"
              value={this.props.port}
              onChange={this.props.onPortChange}
              validation={this.props.validation.fields.port}
            />
          </div>
          <Button
            className="settings__button__item"
            kind="primary"
            label="Save"
            disabled={!this.props.isSubmitEnabled}
            onClick={this.props.onConfigurationSaveClick}
          />
        </div>
        

        <div className="settings_list_container">
          <DataList
            list={this.props.configurations}
            columns={columns}
            onSelect={this.props.onConfigurationSelect}
          />
        </div>
        <Button
          className=".settings__button__item settings__button__item--export"
          disabled={this.props.configurations.length === 0}
          kind="secondary"
          label="Export"
          noFill
          onClick={this.props.onExportConfigurationsClick}
        />
      </div>
    );
  }
}

const stateProps = state => ({
  configurations: getConfigurations(state),
  protocol: getSettingsProtocol(state),
  host: getSettingsHost(state),
  port: getSettingsPort(state),
  currentProtocol: getCurrentSettingsProtocol(state),
  currentHost: getCurrentSettingsHost(state),
  currentPort: getCurrentSettingsPort(state),
  validation: getValidationResult(state),
  isSubmitEnabled: getIsSubmitEnabled(state),
});

const actionProps = dispatch => ({
  onExportConfigurationsClick: () => dispatch(exportConfigurations()),
  onConfigurationSaveClick: () => dispatch(saveConfiguration()),
  onConfigurationSelect: config => dispatch(selectConfiguration(config)),
  onRemoveConfigurationClick: config  => dispatch(removeConfiguration(config)),
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
