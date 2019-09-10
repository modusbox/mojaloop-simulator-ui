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

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, FormInput, Spinner, Title } from "components";
import { QUOTE_TYPES } from "./constants";
import { CURRENCIES } from "../constants";
import { arrayToOptions } from "../../utils/html";
import "./Tester.css";

import {
  changeType,
  changeAmount,
  changeCurrency,
  changePayeeDfsp
} from "./actions";
import {
  getIsTesterLoading,
  getPayeeDfspId,
  getType,
  getAmount,
  getCurrency,
  getIsSubmitEnabled,
  getValidationResult
} from "./selectors";

const stateProps = state => ({
  isTesterLoading: getIsTesterLoading(state),
  payeeDfspId: getPayeeDfspId(state),
  type: getType(state),
  amount: getAmount(state),
  currency: getCurrency(state),
  isSubmitEnabled: getIsSubmitEnabled(state),
  validation: getValidationResult(state)
});
const actionProps = dispatch => ({
  onPayeeDfspChange: value => dispatch(changePayeeDfsp(value)),
  onTypeChange: value => dispatch(changeType(value)),
  onAmountChange: value => dispatch(changeAmount(value)),
  onCurrencyChange: value => dispatch(changeCurrency(value))
});

const currencies = arrayToOptions(CURRENCIES);

const TesterLoader = () => <Spinner center size="m" />;
const TesterError = () => (
  <div id="app_error">There was an error while reading the environments</div>
);

class Tester extends PureComponent {
  render() {
    const {
      type,
      amount,
      currency,
      payeeDfspId,
      validation,
      isSubmitEnabled,
      onTypeChange,
      onCurrencyChange,
      onAmountChange,
      onPayeeDfspChange
    } = this.props;
    return (
      <div id="tester">
        <Title>Request a Quote</Title>

        <div className="tester__runner__form">
          <div className="tester__runner__form-input">
            <FormInput
              type="select"
              label="Quote type"
              value={type}
              options={QUOTE_TYPES}
              onChange={onTypeChange}
              validation={validation.fields.type}
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="text"
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={onAmountChange}
              validation={validation.fields.amount}
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="select"
              label="Currency"
              placeholder="Select Currency"
              options={currencies}
              value={currency}
              onChange={onCurrencyChange}
              validation={validation.fields.currency}
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="select"
              label="Payee DFSP"
              value={payeeDfspId}
              onChange={onPayeeDfspChange}
              validation={validation.fields.payeeDfspId}
            />
          </div>
        </div>

        <div className="tester__runner__button">
          <Button label="Request Quote" disabled={!isSubmitEnabled} />
        </div>
      </div>
    );
  }
}

class TesterWrapper extends PureComponent {
  render() {
    if (this.props.isTesterLoading) {
      return <TesterLoader />;
    } else if (this.props.isTesterLoadingFailed) {
      return <TesterError />;
    }
    return <Tester {...this.props} />;
  }
}

const ConnectedTester = connect(
  stateProps,
  actionProps
)(TesterWrapper);

export default ConnectedTester;

export { Tester };
