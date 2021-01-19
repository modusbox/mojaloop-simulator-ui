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

import {
  createValidator,
  createValidation,
  createOptionalValidation,
  vd
} from "modusbox-ui-components/dist/redux-validation";

const pathValidator = createValidator(`Is a valid path`, path => {
  if (!path || path === "") {
    return true;
  }
  return path.startsWith("/") && path.indexOf(" ") === -1;
});

export const getSettingsValidators = () => ({
  name: createValidation([vd.isRequired]),
  protocol: createValidation([vd.isRequired]),
  host: createValidation([vd.isRequired]),
  port: createValidation([vd.isRequired, vd.isNum]),
  path: createOptionalValidation([pathValidator])
});
