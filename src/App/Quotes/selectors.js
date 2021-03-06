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

import { createSelector } from "reselect";
import {
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getQuoteResponseValidators } from "./validators";
import { QUOTE_RESPONSE_ACCEPT } from "./constants";

export const getIsQuotesLoading = state => state.quotes.isQuotesLoading;
export const getQuotes = state => state.quotes.quotes;
export const getQuoteResponses = state => state.quotes.quoteResponses;

export const getQuoteRepsonsesValidationResults = createSelector(
  getQuoteResponses,
  responses => {
    return responses.map(response => {
      const isAccept = response.type === QUOTE_RESPONSE_ACCEPT;
      const validation = getQuoteResponseValidators(isAccept);
      return toValidationResult(response, validation);
    });
  }
);

export const getSubmitButtonsEnabled = createSelector(
  getQuoteRepsonsesValidationResults,
  results => {
    return results.map(getIsValid);
  }
);
