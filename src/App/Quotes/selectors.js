import { createSelector } from 'reselect';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from 'lodash/find';
import get from 'lodash/get';
import { is422, is400, is500 } from 'utils/http';

export const getIsQuotesLoading = state => state.quotes.isQuotesLoading;
export const getQuotes = state => state.quotes.quotes;
export const getQuoteResponses = state => state.quotes.quoteResponses;