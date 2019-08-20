import { createSelector } from 'reselect';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from 'lodash/find';
import get from 'lodash/get';
import { is422, is400, is500 } from 'utils/http';

export const getIsTesterLoading = state => state.tester.isTesterLoading;

export const getDfspId = state => state.tester.dfspId;
export const getPayeeDfspId = state => state.tester.payeeDfspId;
export const getType = state => state.tester.type;
export const getAmount = state => state.tester.amount;
export const getCurrency = state => state.tester.currency;