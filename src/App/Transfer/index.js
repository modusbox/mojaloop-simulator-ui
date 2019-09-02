import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, Spinner, Title } from 'components';
import { ID_TYPES } from '../Users/constants'; 
import { CURRENCIES } from '../constants';
import { OPERATIONS } from './constants';
import { arrayToOptions } from '../../utils/html'
import TransferResponse from './TransferResponse';
import './Transfer.css';

import {
  changeName,
  changeOperation,
  changeHomeTransactionId,
  changeFromDisplayName,
  changeFromIdType,
  changeFromIdValue,
  changeToIdType,
  changeToIdValue,
  changeNote,
  changeAmountType,
  changeAmount,
  changeCurrency,
  changeTransactionType,
  randomize,
  sendTransfer,
} from './actions';
import {
  getIsTransferLoading,
  getTransfer,
  getTransferResponse,
  getIsSubmitEnabled,
  getIsSubmitPending,
  getValidationResult,
} from './selectors';

const stateProps = state => ({
  isTransferLoading: getIsTransferLoading(state),
  transfer: getTransfer(state),
  transferResponse: getTransferResponse(state),
  isSubmitEnabled: getIsSubmitEnabled(state),
  isSubmitPending: getIsSubmitPending(state),
  validation: getValidationResult(state),
});
const actionProps = dispatch => ({
  onNameChange: value => dispatch(changeName(value)),
  onOperationChange: value => dispatch(changeOperation(value)),
  onHomeTransactionIdChange: value => dispatch(changeHomeTransactionId(value)),
  onFromDisplayNameChange: value => dispatch(changeFromDisplayName(value)),
  onFromIdTypeChange: value => dispatch(changeFromIdType(value)),
  onFromIdValueChange: value => dispatch(changeFromIdValue(value)),
  onToIdTypeChange: value => dispatch(changeToIdType(value)),
  onToIdValueChange: value => dispatch(changeToIdValue(value)),
  onNoteChange: value => dispatch(changeNote(value)),
  onAmountTypeChange: value => dispatch(changeAmountType(value)),
  onAmountChange: value => dispatch(changeAmount(value)),
  onCurrencyChange: value => dispatch(changeCurrency(value)),
  onTransactionTypeChange: value => dispatch(changeTransactionType(value)),
  onSendTransferClick: () => dispatch(sendTransfer()),
  onRandomizeClick: () =>dispatch(randomize()),
});

const currencies = arrayToOptions(CURRENCIES);

const TransferLoader = () => <Spinner center size="m" />;
const TransferError = () => <div id="app_error">There was an error while reading the environments</div>;

class Transfer extends PureComponent {
  render() {
    const {
      transfer,
      transferResponse,
      validation,
      isSubmitEnabled,
      isSubmitPending,

      onNameChange,
      onOperationChange,
      onHomeTransactionIdChange,
      onFromDisplayNameChange,
      onFromIdTypeChange,
      onFromIdValueChange,
      onToIdTypeChange,
      onToIdValueChange,
      onNoteChange,
      onAmountTypeChange,
      onAmountChange,
      onCurrencyChange,
      onTransactionTypeChange,
      
      onRandomizeClick,
      onSendTransferClick,
    } = this.props;
    return (
      <div id="transfer">

        <Title>Send</Title>

        <div className="transfer__runner__form">
          <div className="transfer__runner__form-row">
            <div className="transfer__runner__form-row-label">General</div> 
            <div className="transfer__runner__form-input">
              <FormInput
                size='m'
                type="text"
                label="Name"
                placeholder="name"
                value={transfer.name}
                onChange={onNameChange}
                validation={validation.fields.name}
              />
            </div>
            <div className="transfer__runner__form-input">
              <FormInput
                size='m'
                type="select"
                label="Operation"
                placeholder="operation"
                options={OPERATIONS}
                value={transfer.operation}
                onChange={onOperationChange}
                validation={validation.fields.operation}
              />
            </div>
          </div>
          <div className="transfer__runner__form-row">
            <div className="transfer__runner__form-row-label">Transfer</div> 
            <div className="transfer__runner__form-input">
              <FormInput
                size='m'
                type="text"
                label="Home Transaction ID"
                placeholder="body.homeTransactionId"
                value={transfer.body.homeTransactionId}
                onChange={onHomeTransactionIdChange}
                validation={validation.fields.body.fields.homeTransactionId}
              />
            </div>
            <div className="transfer__runner__form-input">
              <FormInput
                size='m'
                type="text"
                label="Note"
                placeholder="body.note"
                value={transfer.body.note}
                onChange={onNoteChange}
                validation={validation.fields.body.fields.note}
              />
            </div>
          </div>
          <div className="transfer__runner__form-row">
            <div className="transfer__runner__form-row-label">Amounts</div> 
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="text"
                label="Amount Type"
                placeholder="body.amountType"
                value={transfer.body.amountType}
                onChange={onAmountTypeChange}
                validation={validation.fields.body.fields.amountType}
              />
            </div>
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="text"
                label="Amount"
                placeholder="body.amount"
                value={transfer.body.amount}
                onChange={onAmountChange}
                validation={validation.fields.body.fields.amount}
              />
            </div>
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="select"
                label="Currency"
                placeholder="body.currency"
                options={currencies}
                value={transfer.body.currency}
                onChange={onCurrencyChange}
                validation={validation.fields.body.fields.currency}
              />
            </div>
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="text"
                label="Transaction Type"
                placeholder="body.transactionType"
                value={transfer.body.transactionType}
                onChange={onTransactionTypeChange}
                validation={validation.fields.body.fields.transactionType}
              />
            </div>
          </div>
          <div className="transfer__runner__form-row">
            <div className="transfer__runner__form-row-label">From</div> 
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="select"
                options={ID_TYPES}
                label="From ID Type"
                placeholder="body.from.idType"
                value={transfer.body.from.idType}
                onChange={onFromIdTypeChange}
                validation={validation.fields.body.fields.from.fields.idType}
              />
            </div>
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="text"
                label="From ID Value"
                placeholder="body.from.idValue"
                value={transfer.body.from.idValue}
                onChange={onFromIdValueChange}
                validation={validation.fields.body.fields.from.fields.idValue}
              />
            </div>
            <div className="transfer__runner__form-input">
              <FormInput
                size='m'
                type="text"
                label="From Display Name"
                placeholder="body.from.displayName"
                value={transfer.body.from.displayName}
                onChange={onFromDisplayNameChange}
                validation={validation.fields.body.fields.from.fields.displayName}
              />
            </div>
          </div>
          <div className="transfer__runner__form-row">
            <div className="transfer__runner__form-row-label">To</div> 
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="select"
                options={ID_TYPES}
                label="To ID Type"
                placeholder="body.to.idType"
                value={transfer.body.to.idType}
                onChange={onToIdTypeChange}
                validation={validation.fields.body.fields.to.fields.idType}
              />
            </div>
            <div className="transfer__runner__form-input transfer__runner__form-input--small">
              <FormInput
                size='m'
                type="text"
                label="To ID Value"
                placeholder="body.to.idValue"
                value={transfer.body.to.idValue}
                onChange={onToIdValueChange}
                validation={validation.fields.body.fields.to.fields.idValue}
              />
            </div>
          </div>
        </div>
        
        <div className="transfer__button__row">
          <Button 
            className="transfer__button__item"
            kind="secondary"
            noFill
            label="Randomize"
            onClick={onRandomizeClick}
          />
          <Button 
            className="transfer__button__item"
            label="Send Transfer"
            disabled={!isSubmitEnabled}
            pending={isSubmitPending}
            onClick={onSendTransferClick}
          />
        </div>

        {transferResponse && <TransferResponse response={transferResponse} name={transfer.name}/> }

      </div>
    );
  }
}

class TransferWrapper extends PureComponent {
  render() {
    if (this.props.isTransferLoading) {
      return <TransferLoader />;
    } else if (this.props.isTransferLoadingFailed) {
      return <TransferError />;
    }
    return <Transfer {...this.props} />;
  }
}

const ConnectedTransfer = connect(
  stateProps,
  actionProps
)(TransferWrapper);

export default ConnectedTransfer;

export { Transfer };
