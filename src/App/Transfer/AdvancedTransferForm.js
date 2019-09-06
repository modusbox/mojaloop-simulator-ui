import React from "react";
import { ControlIcon, FormInput } from "components";
import { ID_TYPES } from "../Users/constants";
import { CURRENCIES } from "../constants";
import { OPERATIONS, QUOTE_TYPES } from "./constants";
import { arrayToOptions } from "../../utils/html";

const currencies = arrayToOptions(CURRENCIES);

const AdvancedTransferForm = ({
  transfer,
  validation,
  onNameChange,

  onResetFormButtonClick,
  onRandomizeFormButtonClick,
  onExportFormButtonClick,
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
  onTransactionTypeChange
}) => (
  <div className="transfer__runner__form">
    <div className="transfer__runner__form-controls">
      <ControlIcon
        tooltip="Reset Form"
        icon="trash-small"
        size={20}
        containerClassName="transfer__runner__icon-container"
        className="transfer__runner__icon transfer__icon__reset"
        onClick={onResetFormButtonClick}
        delay={1000}
      />
      <ControlIcon
        tooltip="Generate Random Values"
        icon="edit-small"
        size={20}
        containerClassName="transfer__runner__icon-container"
        className="transfer__runner__icon transfer__icon__edit"
        onClick={onRandomizeFormButtonClick}
        delay={1000}
      />
      <ControlIcon
        tooltip="Export Form (JSON)"
        icon="saved"
        size={20}
        containerClassName="transfer__runner__icon-container"
        className="transfer__runner__icon transfer__icon__export"
        onClick={onExportFormButtonClick}
        delay={1000}
      />
    </div>
    <div className="transfer__runner__form-row">
      <div className="transfer__runner__form-row-label">General</div>
      <div className="transfer__runner__form-input">
        <FormInput
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
          type="select"
          label="Amount Type"
          placeholder="body.amountType"
          options={QUOTE_TYPES}
          value={transfer.body.amountType}
          onChange={onAmountTypeChange}
          validation={validation.fields.body.fields.amountType}
        />
      </div>
      <div className="transfer__runner__form-input transfer__runner__form-input--small">
        <FormInput
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
          size="m"
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
);

export default AdvancedTransferForm;
