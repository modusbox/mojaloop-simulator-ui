import {
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getTransferRequestValidators } from "./validators";
import { createSelector } from "reselect";
import { createPendingSelector } from "modusbox-ui-components/dist/redux-fetch";
// import find from 'lodash/find';
// import get from 'lodash/get';

export const getIsTransferLoading = state => state.transfer.isTransferLoading;
export const getTransfer = state => state.transfer.transfer;
export const getTransferResponse = state => state.transfer.transferResponse;
export const getIsAllFieldsVisible = state => state.transfer.isAllFieldsVisible;
export const getIsAdvancedMode = state => state.transfer.isAdvancedMode;

export const getValidationResult = createSelector(
  getTransfer,
  getTransferRequestValidators,
  toValidationResult
);

const getIsTransferModelValid = createSelector(
  getValidationResult,
  getIsValid
);

export const getIsScenarioCreatePending = createPendingSelector(
  "scenarios.create"
);

export const getIsSubmitEnabled = createSelector(
  getIsTransferModelValid,
  getIsScenarioCreatePending,
  (isValid, isPending) => isValid && !isPending
);

export const getIsSubmitPending = getIsScenarioCreatePending;
