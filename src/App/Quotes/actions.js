import { createAction } from 'redux-actions';

export const SET_QUOTES_LOADING = 'Quotes / Set Is Loading';
export const UNSET_QUOTES_LOADING = 'Quotes / Unset Is Loading';
export const CHANGE_QUOTE_RESPONSE = 'Quotes / Change Response';

export const setAppLoading = createAction(SET_QUOTES_LOADING);
export const unsetAppLoading = createAction(UNSET_QUOTES_LOADING);
export const changeQuoteResponse = createAction(CHANGE_QUOTE_RESPONSE);

export const initQuotes= () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  // await dispatch(storeEnvironments());
  dispatch(unsetAppLoading());
};

