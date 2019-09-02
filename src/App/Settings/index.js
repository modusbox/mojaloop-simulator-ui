import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Title, FormInput } from 'components';
import './Settings.css';
import { setSettingsHost, setSettingsPort } from './actions';
import { getSettingsHost, getSettingsPort } from './selectors';

class Settings extends PureComponent {
  render() {
    return (
      <div id="settings">

        <Title>Settings</Title>

        <div className="settings__form">
          <div className="settings__form-input">
            <FormInput
              type="text"
              label="Host"
              value={this.props.host}
              onChange={this.props.onHostChange}
            />
          </div>
          <div className="settings__form-input">
            <FormInput
              type="text"
              label="Port"
              value={this.props.port}
              onChange={this.props.onPortChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const stateProps = state => ({
  host: getSettingsHost(state),
  port: getSettingsPort(state),
});

const actionProps = dispatch => ({
  onPortChange: value => dispatch(setSettingsPort(value)),
  onHostChange: value => dispatch(setSettingsHost(value)),
});

const ConnectedSettings = connect(
  stateProps,
  actionProps
)(Settings);

export default ConnectedSettings;

export { Settings };
