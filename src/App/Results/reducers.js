import { handleActions } from 'redux-actions';
import { isDevelopment } from 'utils/env';
import {
  SET_RESULTS_CONFIG,
  SET_RESULTS_LOADING,
  UNSET_RESULTS_LOADING,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
  SET_DFSPS,
  SET_DFSPS_ERROR,
  SET_DFSP_ID,
  UNSET_DFSPS,
} from './actions';

const initialState = {
  isDevelopment,
  config: {},
  isResultsLoading: true,
  isSuccessToastVisible: false,
  isErrorModalVisible: false,
  errorModalPayload: undefined,
  environments: [],
  environmentsError: undefined,
  environmentsLoaded: false,
  environmentId: undefined,
  dfsps: [],
  dfspsError: undefined,
  dfspId: undefined,
};

const Results = handleActions(
  {
    [SET_RESULTS_CONFIG]: (state, action) => ({
      ...state,
      config: action.payload,
    }),
    [SET_RESULTS_LOADING]: (state, action) => ({
      ...state,
      isResultsLoading: true,
    }),
    [UNSET_RESULTS_LOADING]: (state, action) => ({
      ...state,
      isResultsLoading: false,
    }),
    [SHOW_TOAST]: (state, action) => ({
      ...state,
      isSuccessToastVisible: true,
    }),
    [HIDE_TOAST]: (state, action) => ({
      ...state,
      isSuccessToastVisible: false,
    }),
    [SHOW_ERROR_MODAL]: (state, action) => ({
      ...state,
      isErrorModalVisible: true,
      errorModalPayload: action.payload,
    }),
    [HIDE_ERROR_MODAL]: (state, action) => ({
      ...state,
      isErrorModalVisible: false,
      errorModalPayload: undefined,
    }),
    [SET_DFSPS]: (state, action) => ({
      ...state,
      dfsps: action.payload,
    }),
    [SET_DFSPS_ERROR]: (state, action) => ({
      ...state,
      dfspsError: action.payload,
    }),
    [SET_DFSP_ID]: (state, action) => ({
      ...state,
      dfspId: action.payload,
    }),
    [UNSET_DFSPS]: (state, action) => ({
      ...state,
      dfsps: initialState.dfsps,
    })
  },
  initialState
);

export default Results;
export { initialState };
