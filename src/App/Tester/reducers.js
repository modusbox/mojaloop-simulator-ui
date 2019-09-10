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

import { handleActions } from "redux-actions";
import {
  SET_TESTER_LOADING,
  UNSET_TESTER_LOADING,
  CHANGE_PAYEE_DFSP,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  CHANGE_CURRENCY
} from "./actions";

const initialState = {
  isTesterLoading: false,
  payeeDfspId: undefined,
  type: "SEND",
  amount: undefined,
  currency: undefined
};

const Tester = handleActions(
  {
    [SET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: true
    }),
    [UNSET_TESTER_LOADING]: (state, action) => ({
      ...state,
      isTesterLoading: false
    }),
    [CHANGE_PAYEE_DFSP]: (state, action) => ({
      ...state,
      payeeDfspId: action.payload
    }),
    [CHANGE_TYPE]: (state, action) => ({
      ...state,
      test: action.payload
    }),
    [CHANGE_AMOUNT]: (state, action) => ({
      ...state,
      amount: action.payload
    }),
    [CHANGE_CURRENCY]: (state, action) => ({
      ...state,
      currency: action.payload
    })
  },
  initialState
);

export default Tester;
export { initialState };
