/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { createAction } from "redux-actions";

export const SET_TESTER_LOADING = "Tester/ Set Is Loading";
export const UNSET_TESTER_LOADING = "Tester/ Unset Is Loading";
export const CHANGE_DFSP = "Tester / change dfsp";
export const CHANGE_PAYEE_DFSP = "Tester / change secondary dfsp";
export const CHANGE_TYPE = "Tester / change type";
export const CHANGE_AMOUNT = "Tester / change amount";
export const CHANGE_CURRENCY = "Tester / change currency";

export const setAppLoading = createAction(SET_TESTER_LOADING);
export const unsetAppLoading = createAction(UNSET_TESTER_LOADING);
export const changePayeeDfsp = createAction(CHANGE_PAYEE_DFSP);
export const changeType = createAction(CHANGE_TYPE);
export const changeAmount = createAction(CHANGE_AMOUNT);
export const changeCurrency = createAction(CHANGE_CURRENCY);
