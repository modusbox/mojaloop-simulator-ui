import { handleActions } from 'redux-actions';
import { isDevelopment } from 'utils/env';
import {
  SET_TESTER_CONFIG,
  SET_TESTER_LOADING,
  UNSET_TESTER_LOADING,
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
  isTesterLoading: true,
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

const Tester = handleActions(
  {
    [SET_TESTER_CONFIG]: (state, action) => ({
      ...state,
      config: action.payload,
    }),
    [SET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: true,
    }),
    [UNSET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: false,
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

export default Tester;
export { initialState };
