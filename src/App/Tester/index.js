import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, Spinner, Title } from 'components';
import { QUOTE_TYPES } from './constants';
import './Tester.css';

import {
  changeType,
  changeAmount,
  changeCurrency,
  changeSecondaryDfsp,
} from './actions';
import {
  getIsTesterLoading,
  getPayeeDfspId,
  getType,
  getAmount,
  getCurrency,
} from './selectors';

const stateProps = state => ({
  isTesterLoading: getIsTesterLoading(state),
  payeeDfspId: getPayeeDfspId(state),
  type: getType(state),
  amount: getAmount(state),
  currency: getCurrency(state),
});
const actionProps = dispatch => ({
  onSecondaryDfspChange: value => dispatch(changeSecondaryDfsp(value)),
  onTypeChange: value => dispatch(changeType(value)),
  onAmountChange: value => dispatch(changeAmount(value)),
  onCurrencyChange: value => dispatch(changeCurrency(value)),
});

const TesterLoader = () => <Spinner center size="m" />;
const TesterError = () => <div id="app_error">There was an error while reading the environments</div>;

class Tester extends PureComponent {
  render() {
    const {
      type,
      amount,
      currency,
      payeeDfspId,
      onTypeChange,
      onCurrencyChange,
      onAmountChange,
      onSecondaryDfspChange,
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
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="text"
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={onAmountChange}
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="text"
              label="Currency"
              placeholder="Select Currency"
              value={currency}
              onChange={onCurrencyChange}
            />
          </div>
          <div className="tester__runner__form-input">
            <FormInput
              type="select"
              label="Payee DFSP"
              value={payeeDfspId}
              onChange={onSecondaryDfspChange}
            />
          </div>
        </div>

        <div className="tester__runner__button">
          <Button label="Request Quote" />
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
