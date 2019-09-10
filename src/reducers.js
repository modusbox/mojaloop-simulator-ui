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

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as api } from "modusbox-ui-components/dist/redux-fetch";

import app from "App/reducers";
import settings from "App/Settings/reducers";
import users from "App/Users/reducers";
import transfer from "App/Transfer/reducers";
// import tester from 'App/Tester/reducers';
// import results from 'App/Results/reducers';
// import quotes from 'App/Quotes/reducers';

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    api,
    settings,
    app,
    users,
    transfer
    // results,
    // quotes,
    // tester,
  });

export default reducers;
