import { createAction } from 'redux-actions';
import api from 'utils/api';
import { is200 } from 'utils/http';
import { sleep } from 'utils/async';

export const SET_TESTER_CONFIG = 'Tester/ Set Config';
export const SET_TESTER_LOADING = 'Tester/ Set Is Loading';
export const UNSET_TESTER_LOADING = 'Tester/ Unset Is Loading';
export const SHOW_TOAST = 'Tester/ Show Toast';
export const HIDE_TOAST = 'Tester/ Hide Toast';
export const SHOW_ERROR_MODAL = 'Tester/ Show Error Modal';
export const HIDE_ERROR_MODAL = 'Tester/ Hide Error Modal';
export const SET_DFSPS = 'Tester/ Set DFSPs';
export const SET_DFSPS_ERROR = 'Tester/ Set DFSPs Error';
export const SET_DFSP_ID = 'Tester/ Set DFSP Id';
export const UNSET_ENVIRONMENT_ID = 'Tester/ Unset Environment Id';
export const UNSET_DFSPS = 'Tester/ Unset DFSPs';

export const setAppConfig = createAction(SET_TESTER_CONFIG);
export const setAppLoading = createAction(SET_TESTER_LOADING);
export const unsetAppLoading = createAction(UNSET_TESTER_LOADING);
export const showToast = createAction(SHOW_TOAST);
export const hideToast = createAction(HIDE_TOAST);
export const showErrorModal = createAction(SHOW_ERROR_MODAL);
export const hideErrorModal = createAction(HIDE_ERROR_MODAL);
export const setDfsps = createAction(SET_DFSPS);
export const setDfspsError = createAction(SET_DFSPS_ERROR);
export const setDfspId = createAction(SET_DFSP_ID);
export const unsetEnvironmentId = createAction(UNSET_ENVIRONMENT_ID);
export const unsetDfsps = createAction(UNSET_DFSPS);

export const storeDFSPs = () => async dispatch => {
  const { data, status } = await dispatch(api.dfsps.read({}));
  if (is200(status)) {
    dispatch(setDfsps(data));
  } else {
    dispatch(setDfspsError(data));
  }
};

export const initTester= () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  // await dispatch(storeEnvironments());
  dispatch(unsetAppLoading());
};

export const showSuccessToast = (ms = 3000) => async dispatch => {
  dispatch(showToast());
  await sleep(ms);
  dispatch(hideToast());
};
