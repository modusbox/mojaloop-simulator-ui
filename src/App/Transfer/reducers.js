import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import uuid from 'uuid/v1';
import {
  SET_TRANSFER_LOADING,
  UNSET_TRANSFER_LOADING,
  SET_TRANSFER_RESPONSE,
  CHANGE_TYPE,
  CHANGE_NAME,
  CHANGE_OPERATION,
  CHANGE_HOME_TRANSACTION_ID,
  CHANGE_FROM_ID_DISPLAY_NAME,
  CHANGE_FROM_ID_TYPE,
  CHANGE_FROM_ID_VALUE,
  CHANGE_TO_ID_TYPE,
  CHANGE_TO_ID_VALUE,
  CHANGE_NOTE,
  CHANGE_AMOUNT_TYPE,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY,
  CHANGE_TRANSACTION_TYPE,
} from './actions';

const initialTransferState = { 
  name: 'Test',
  operation: 'postTransfers',
  body: {
    "homeTransactionId": uuid(),
    "from": {
        "displayName": "The dark knight",
        "idType": "MSISDN",
        "idValue": "123456"
    },
    "to": {
        "idType": "MSISDN",
        "idValue": "123456789"
    },
    "note": "this is a test",
    "amountType": "SEND",
    "currency": "USD",
    "amount": "100",
    "transactionType": "TRANSFER"
  }
  //params: {} ?
}


const initialState = {
  isTransferLoading: false,
  transfer: initialTransferState,
  transferResponse: undefined,
};

const changeTransferField = (path) => (state, action) => {
  const value = action.payload;
  let newState = cloneDeep(state);
  set(newState.transfer, path, value);
  return newState;
}

const Transfer = handleActions(
  {
    [SET_TRANSFER_LOADING]: (state, action) => ({
      ...state,
      isTransferLoading: true,
    }),
    [UNSET_TRANSFER_LOADING]: (state, action) => ({
      ...state,
      isTransferLoading: false,
    }),
    [SET_TRANSFER_RESPONSE]: (state, action) => ({
      ...state,
      transferResponse: action.payload,
    }),
    [CHANGE_TYPE]: changeTransferField('type'),
    [CHANGE_NAME]: changeTransferField('name'),
    [CHANGE_OPERATION]: changeTransferField('operation'),
    [CHANGE_HOME_TRANSACTION_ID]: changeTransferField('body.transactionId'),
    [CHANGE_FROM_ID_DISPLAY_NAME]: changeTransferField('body.from.displayName'),
    [CHANGE_FROM_ID_TYPE]: changeTransferField('body.from.idType'),
    [CHANGE_FROM_ID_VALUE]: changeTransferField('body.from.idValue'),
    [CHANGE_TO_ID_TYPE]: changeTransferField('body.to.idType'),
    [CHANGE_TO_ID_VALUE]: changeTransferField('body.to.idValue'),
    [CHANGE_NOTE]: changeTransferField('body.note'),
    [CHANGE_AMOUNT_TYPE]: changeTransferField('body.amountType'),
    [CHANGE_CURRENCY]: changeTransferField('body.currency'),
    [CHANGE_AMOUNT]: changeTransferField('body.amount'),
    [CHANGE_TRANSACTION_TYPE]: changeTransferField('body.transactionType'),
  },
  initialState
);

export default Transfer;
export { initialState };
