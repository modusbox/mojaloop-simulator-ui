import { createAction } from 'redux-actions';

export const SET_QUOTES_LOADING = 'Quotes / Set Is Loading';
export const UNSET_QUOTES_LOADING = 'Quotes / Unset Is Loading';
export const CHANGE_QUOTE_RESPONSE_TYPE = 'Quotes / change response type';
export const CHANGE_QUOTE_RESPONSE_AMOUNT = 'Quotes / change response amount';

export const setAppLoading = createAction(SET_QUOTES_LOADING);
export const unsetAppLoading = createAction(UNSET_QUOTES_LOADING);
export const changeQuoteResponseType = createAction(CHANGE_QUOTE_RESPONSE_TYPE);
export const changeQuoteResponseAmount = createAction(CHANGE_QUOTE_RESPONSE_AMOUNT);

export const initQuotes= () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  // await dispatch(storeEnvironments());
  dispatch(unsetAppLoading());
};

