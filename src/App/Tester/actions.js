import { createAction } from 'redux-actions';
import api from 'utils/api';
import { is200 } from 'utils/http';
import { sleep } from 'utils/async';

export const SET_TESTER_LOADING = 'Tester/ Set Is Loading';
export const UNSET_TESTER_LOADING = 'Tester/ Unset Is Loading';
export const CHANGE_DFSP = 'Tester / change dfsp';
export const CHANGE_SECONDARY_DFSP = 'Tester / change secondary dfsp';
export const CHANGE_TYPE = 'Tester / change type';
export const CHANGE_AMOUNT = 'Tester / change amount';
export const CHANGE_CURRENCY = 'Tester / change currency';

export const setAppLoading = createAction(SET_TESTER_LOADING);
export const unsetAppLoading = createAction(UNSET_TESTER_LOADING);
export const changeSecondaryDfsp = createAction(CHANGE_SECONDARY_DFSP);
export const changeType = createAction(CHANGE_TYPE);
export const changeAmount = createAction(CHANGE_AMOUNT);
export const changeCurrency = createAction(CHANGE_CURRENCY);
