import { createAction } from 'redux-actions';
import uuid from 'uuid/v4';
import api from 'utils/api';
import { downloadFile } from 'utils/html';
import { ID_TYPES } from '../Users/constants'; 
import { CURRENCIES } from '../constants';
import { OPERATIONS, QUOTE_TYPES } from './constants';
import { getTransfer } from './selectors';

export const SET_MODE = 'Transfer / Set Mode';
export const TOGGLE_ALL_FIELDS = 'Transfer / Toggle All Fields';
export const SET_TRANSFER_LOADING = 'Transfer / Set Is Loading';
export const UNSET_TRANSFER_LOADING = 'Transfer / Unset Is Loading';
export const SET_TRANSFER_RESPONSE = 'Transfer / Set Response';

export const CHANGE_TYPE = 'Transfer / change type';
export const CHANGE_NAME = 'Transfer / change name';
export const CHANGE_OPERATION = 'Transfer / change operation';
export const CHANGE_HOME_TRANSACTION_ID = 'Transfer / change home transaction id';
export const CHANGE_FROM_ID_DISPLAY_NAME = 'Transfer / change from id display name';
export const CHANGE_FROM_ID_TYPE = 'Transfer / change from id type';
export const CHANGE_FROM_ID_VALUE = 'Transfer / change from id value';
export const CHANGE_TO_ID_TYPE = 'Transfer / change to id type';
export const CHANGE_TO_ID_VALUE = 'Transfer / change to id value';
export const CHANGE_NOTE = 'Transfer / change note';
export const CHANGE_AMOUNT_TYPE = 'Transfer / change amount type';
export const CHANGE_AMOUNT = 'Transfer / change amount';
export const CHANGE_CURRENCY = 'Transfer / change currency';
export const CHANGE_TRANSACTION_TYPE = 'Transfer / change transaction type';

export const setMode = createAction(SET_MODE);
export const toggleAllFields = createAction(TOGGLE_ALL_FIELDS);
export const setTransferLoading = createAction(SET_TRANSFER_LOADING);
export const unsetTransferLoading = createAction(UNSET_TRANSFER_LOADING);
export const setTransferResponse = createAction(SET_TRANSFER_RESPONSE);

export const changeName = createAction(CHANGE_NAME);
export const changeOperation = createAction(CHANGE_OPERATION);
export const changeHomeTransactionId = createAction(CHANGE_HOME_TRANSACTION_ID);
export const changeFromDisplayName = createAction(CHANGE_FROM_ID_DISPLAY_NAME);
export const changeFromIdType = createAction(CHANGE_FROM_ID_TYPE);
export const changeFromIdValue = createAction(CHANGE_FROM_ID_VALUE);
export const changeToIdType = createAction(CHANGE_TO_ID_TYPE);
export const changeToIdValue = createAction(CHANGE_TO_ID_VALUE);
export const changeNote = createAction(CHANGE_NOTE);
export const changeAmountType = createAction(CHANGE_AMOUNT_TYPE);
export const changeAmount = createAction(CHANGE_AMOUNT);;
export const changeCurrency = createAction(CHANGE_CURRENCY);;
export const changeTransactionType = createAction(CHANGE_TRANSACTION_TYPE);

export const sendTransfer = () => async (dispatch, getState) => {
  const transfer = getTransfer(getState());
  const scenario = [transfer];
  const { status, data } = await dispatch(api.scenarios.create({ body: scenario }));
  if (status === 200) {
    dispatch(setTransferResponse(data));
  }
}
export const resetForm = () => dispatch => {
  dispatch(changeName());
  dispatch(changeOperation());
  dispatch(changeHomeTransactionId());
  dispatch(changeFromDisplayName());
  dispatch(changeFromIdType());
  dispatch(changeFromIdValue());
  dispatch(changeToIdType());
  dispatch(changeToIdValue());
  dispatch(changeNote());
  dispatch(changeAmountType());
  dispatch(changeAmount());
  dispatch(changeCurrency());
  dispatch(changeTransactionType());

}
export const randomizeForm = () => dispatch => {
  const names = ['Mark', 'Steve', 'Rob', 'Joe', 'Mike', 'Lisa', 'Aria', 'Sue'];
  const lastnames = ['Lee', 'Flinn', 'Perk', 'Vosh', 'Ancher', 'Martinez', 'Yang', 'Jung'];
  const alphabet = new Array(26).fill(0).map((_,i) => String.fromCharCode(97 + i));
  const randomNumber = (n) => Math.round(Math.random() * n);
  const getAny = items => items[randomNumber(items.length -1)];
  const getWord = (min, max) => new Array(min + randomNumber(max - min)).fill(0).map(() => getAny(alphabet)).join('');
  const getCode = () => new Array(10).fill(0).map(_ => Math.random().toString().substring(4,5)).join('');
  const getAmount = () => Math.round(Math.random() * 1250)
  const getAmountType = () => getAny(QUOTE_TYPES).value;
  const getNote = () => new Array(1 + randomNumber(5)).fill(0).map(() => getWord(2, 10)).join(' ');
  const getDisplayName = () => `${getAny(names)} ${getAny(lastnames)}`;
  const getOperation = () => getAny(OPERATIONS).value;
  const getName = () => getWord(4,10);
  
  dispatch(changeName(getName()));
  dispatch(changeOperation(getOperation()));
  dispatch(changeHomeTransactionId(uuid()));
  dispatch(changeFromDisplayName(getDisplayName()));
  dispatch(changeFromIdType(ID_TYPES[Math.round(Math.random())].value));
  dispatch(changeFromIdValue(getCode()));
  dispatch(changeToIdType(ID_TYPES[Math.round(Math.random())].value));
  dispatch(changeToIdValue(getCode()));
  dispatch(changeNote(getNote()));
  dispatch(changeAmountType(getAmountType()));
  dispatch(changeAmount(getAmount()));
  dispatch(changeCurrency(getAny(CURRENCIES)));
  dispatch(changeTransactionType('TRANSFER'));

}
export const exportFormrandomize = () => (dispatch, getState) => {
  const transfer = getTransfer(getState());
  const jsonFile = JSON.stringify([transfer], null, 2);
  downloadFile(jsonFile, 'scenarios.json');
}