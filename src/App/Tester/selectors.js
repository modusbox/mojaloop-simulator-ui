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

import {
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getQuoteRequestValidators } from "./validators";
import { createSelector } from "reselect";
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
  (payeeDfspId, type, amount, currency) => ({
    payeeDfspId,
    type,
    amount,
    currency
  })
);

export const getValidationResult = createSelector(
  getRequestModel,
  getQuoteRequestValidators,
  toValidationResult
);

export const getIsSubmitEnabled = createSelector(
  getValidationResult,
  getIsValid
);
