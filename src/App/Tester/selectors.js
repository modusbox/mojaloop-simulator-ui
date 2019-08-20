import { toValidationResult, getIsValid } from 'modusbox-ui-components/dist/redux-validation';
import { getQuoteRequestValidators } from './validators';
import { createSelector } from 'reselect';
// import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
// import find from 'lodash/find';
// import get from 'lodash/get';


export const getIsTesterLoading = state => state.tester.isTesterLoading;

export const getDfspId = state => state.tester.dfspId;
export const getPayeeDfspId = state => state.tester.payeeDfspId;
export const getType = state => state.tester.type;
export const getAmount = state => state.tester.amount;
export const getCurrency = state => state.tester.currency;

const getRequestModel = createSelector(
  getPayeeDfspId,
  getType,
  getAmount,
  getCurrency,
  (
    payeeDfspId,
    type,
    amount,
    currency,
  ) => ({ 
    payeeDfspId,
    type,
    amount,
    currency
  })
);

export const getValidationResult = createSelector(
  getRequestModel,
  getQuoteRequestValidators,
  toValidationResult,
);

export const getIsSubmitEnabled = createSelector(
  getValidationResult,
  getIsValid,
);