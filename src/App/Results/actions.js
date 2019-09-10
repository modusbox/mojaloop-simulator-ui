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

export const SET_RESULTS_LOADING = "Results / Set Is Loading";
export const UNSET_RESULTS_LOADING = "Results / Unset Is Loading";

export const setAppLoading = createAction(SET_RESULTS_LOADING);
export const unsetAppLoading = createAction(UNSET_RESULTS_LOADING);

export const initResults = () => async (dispatch, getState) => {
  dispatch(setAppLoading());
  // await dispatch(storeEnvironments());
  dispatch(unsetAppLoading());
};
