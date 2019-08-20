import { handleActions } from 'redux-actions';
import {
  SET_TESTER_LOADING,
  UNSET_TESTER_LOADING,
  CHANGE_PAYEE_DFSP,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
} from './actions';

const initialState = {
  isTesterLoading: false,
  payeeDfspId: undefined,
  type: 'SEND',
  amount: undefined,
  currency: undefined,
};

const Tester = handleActions(
  {
    [SET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: true,
    }),
    [UNSET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: false,
    }),
    [CHANGE_PAYEE_DFSP]: (state, action) => ({
      ...state,
      payeeDfspId: action.payload,
    }),
    [CHANGE_TYPE]: (state, action) => ({
      ...state,
      test: action.payload,
    }),
    [CHANGE_AMOUNT]: (state, action) => ({
      ...state,
      amount: action.payload,
    }),
    [CHANGE_CURRENCY]: (state, action) => ({
      ...state,
      currency: action.payload,
    }),
  },
  initialState
);

export default Tester;
export { initialState };
