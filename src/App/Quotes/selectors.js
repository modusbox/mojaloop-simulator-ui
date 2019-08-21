import { createSelector } from 'reselect';
import find from 'lodash/find';
import get from 'lodash/get';
import { toValidationResult, getIsValid } from 'modusbox-ui-components/dist/redux-validation';
import { getQuoteResponseValidators } from './validators';
import { QUOTE_RESPONSE_ACCEPT } from './constants';


export const getIsQuotesLoading = state => state.quotes.isQuotesLoading;
export const getQuotes = state => state.quotes.quotes;
export const getQuoteResponses = state => state.quotes.quoteResponses;

export const getQuoteRepsonsesValidationResults = createSelector(
  getQuoteResponses,
  (responses) => {
    return responses.map(response => {
      const isAccept = response.type === QUOTE_RESPONSE_ACCEPT
      const validation = getQuoteResponseValidators(isAccept);
      return toValidationResult(response, validation);
    })
  }
);
