import { createAction } from "redux-actions";
import api from "../../utils/api";

export const SET_QUOTES_LOADING = "Quotes / Set Is Loading";
export const UNSET_QUOTES_LOADING = "Quotes / Unset Is Loading";
export const CHANGE_QUOTE_RESPONSE_TYPE = "Quotes / change response type";
export const CHANGE_QUOTE_RESPONSE_AMOUNT = "Quotes / change response amount";
export const CHANGE_QUOTE_RESPONSE_CURRENCY =
  "Quotes / change response currency";
export const CHANGE_QUOTE_RESPONSE_REASON = "Quotes / change response reason";

export const setQuotesLoading = createAction(SET_QUOTES_LOADING);
export const unsetQuotesLoading = createAction(UNSET_QUOTES_LOADING);
export const changeQuoteResponseType = createAction(CHANGE_QUOTE_RESPONSE_TYPE);
export const changeQuoteResponseAmount = createAction(
  CHANGE_QUOTE_RESPONSE_AMOUNT
);
export const changeQuoteResponseCurrency = createAction(
  CHANGE_QUOTE_RESPONSE_CURRENCY
);
export const changeQuoteResponseReason = createAction(
  CHANGE_QUOTE_RESPONSE_REASON
);

export const initQuotes = () => async (dispatch, getState) => {
  dispatch(setQuotesLoading());
  const requests = await dispatch(api.quoteRequests.read());
  console.log(requests);
  // await dispatch(storeEnvironments());
  dispatch(unsetQuotesLoading());
};
