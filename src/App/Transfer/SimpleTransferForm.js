import React from 'react';
import { FormInput } from 'components';
import { ID_TYPES } from '../Users/constants'; 
import { CURRENCIES } from '../constants';
import { QUOTE_TYPES } from './constants';
import { arrayToOptions } from '../../utils/html'


const currencies = arrayToOptions(CURRENCIES);

const SimpleTransferForm = ({
  transfer,
  validation,
  onFromDisplayNameChange,
  onFromIdTypeChange,
  onFromIdValueChange,
  onToIdTypeChange,
  onToIdValueChange,
  onAmountTypeChange,
  onAmountChange,
  onCurrencyChange,
  onTransactionTypeChange,
}) => (
  <div className="transfer__runner__form">
    <div className="transfer__runner__form-row">
      <div className="transfer__runner__form-row-label">Amounts</div> 
      <div className="transfer__runner__form-input transfer__runner__form-input--small">
        <FormInput
          size='l'
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
          size='l'
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
          size='l'
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
          size='l'
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
          size='l'
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

export default SimpleTransferForm;