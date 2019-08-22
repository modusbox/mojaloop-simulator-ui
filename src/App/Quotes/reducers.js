import { handleActions } from 'redux-actions';
import {
  SET_QUOTES_LOADING,
  UNSET_QUOTES_LOADING,
  CHANGE_QUOTE_RESPONSE_TYPE,
  CHANGE_QUOTE_RESPONSE_AMOUNT,
  CHANGE_QUOTE_RESPONSE_CURRENCY,
  CHANGE_QUOTE_RESPONSE_REASON,
} from './actions';

const fakeQuote = {
  date: '11/12/12',
  amount: '55',
  type: 'Send',
  currency: 'USD',
};

const initialQuoteResponse = {
  type: 'REJECT',
  amount: 12,
  currency: undefined,
  reason: undefined,
};
const initialState = {
  isQuotesLoading: true,
  quotes: [fakeQuote, fakeQuote, fakeQuote],
  quoteResponses: [initialQuoteResponse, initialQuoteResponse, initialQuoteResponse],
};

const Quotes = handleActions(
  {
    [SET_QUOTES_LOADING]: (state, action) => ({
      ...state,
      isQuotesLoading: true,
    }),
    [UNSET_QUOTES_LOADING]: (state, action) => ({
      ...state,
      isQuotesLoading: false,
    }),
    [CHANGE_QUOTE_RESPONSE_TYPE]: (state, action) => ({
      ...state,
      quoteResponses: [
        ...state.quoteResponses.slice(0, action.payload.index),
        {
          ...state.quoteResponses[action.payload.index],
          type: action.payload.type,
        },
        ...state.quoteResponses.slice(action.payload.index + 1)
      ]
    }),
    [CHANGE_QUOTE_RESPONSE_AMOUNT]: (state, action) => ({
      ...state,
      quoteResponses: [
        ...state.quoteResponses.slice(0, action.payload.index),
        {
          ...state.quoteResponses[action.payload.index],
          amount: action.payload.amount,
        },
        ...state.quoteResponses.slice(action.payload.index + 1)
      ]
    }),
    [CHANGE_QUOTE_RESPONSE_CURRENCY]: (state, action) => ({
      ...state,
      quoteResponses: [
        ...state.quoteResponses.slice(0, action.payload.index),
        {
          ...state.quoteResponses[action.payload.index],
          currency: action.payload.currency,
        },
        ...state.quoteResponses.slice(action.payload.index + 1)
      ]
    }),
    [CHANGE_QUOTE_RESPONSE_REASON]: (state, action) => ({
      ...state,
      quoteResponses: [
        ...state.quoteResponses.slice(0, action.payload.index),
        {
          ...state.quoteResponses[action.payload.index],
          reason: action.payload.reason,
        },
        ...state.quoteResponses.slice(action.payload.index + 1)
      ]
    }),
    
  },
  initialState
);

export default Quotes;
export { initialState };
