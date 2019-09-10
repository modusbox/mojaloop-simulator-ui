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

const QUOTE_RESPONSE_ACCEPT = "ACCEPT";
const QUOTE_RESPONSE_REJECT = "REJECT";
const QUOTE_RESPONSES = [
  {
    label: "Accept",
    value: QUOTE_RESPONSE_ACCEPT
  },
  {
    label: "Reject",
    value: QUOTE_RESPONSE_REJECT
  }
];

const QUOTE_REJECT_REASONS = [
  {
    label: "Reason 1",
    value: "REASON_1"
  },
  {
    label: "Reason 2",
    value: "REASON_2"
  }
];

export {
  QUOTE_RESPONSE_ACCEPT,
  QUOTE_RESPONSE_REJECT,
  QUOTE_RESPONSES,
  QUOTE_REJECT_REASONS
};
