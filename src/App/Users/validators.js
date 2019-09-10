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
  vd
} from "modusbox-ui-components/dist/redux-validation";

const idTypeAndValidValidator = (value, isUnique) =>
  createValidator(`Id Type and Id Value must be unique`, () =>
    value !== undefined ? isUnique : false
  );

export const getUserValidators = (idType, idValue, isIdTypeAndValidUnique) => {
  const validators = {
    displayName: createValidation([vd.isRequired]),
    firstName: createValidation([vd.isRequired]),
    lastName: createValidation([vd.isRequired]),
    middleName: createValidation([vd.isRequired]),
    dateOfBirth: createValidation([vd.isRequired]),
    idType: createValidation([
      vd.isRequired,
      idTypeAndValidValidator(idType, isIdTypeAndValidUnique)
    ]),
    idValue: createValidation([
      vd.isRequired,
      idTypeAndValidValidator(idValue, isIdTypeAndValidUnique)
    ])
  };
  return validators;
};
