import { createAction } from 'redux-actions';

export const SET_RESULTS_LOADING = 'Results / Set Is Loading';
export const UNSET_RESULTS_LOADING = 'Results / Unset Is Loading';

export const setAppLoading = createAction(SET_RESULTS_LOADING);
export const unsetAppLoading = createAction(UNSET_RESULTS_LOADING);

export const initResults= () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  // await dispatch(storeEnvironments());
  dispatch(unsetAppLoading());
};

