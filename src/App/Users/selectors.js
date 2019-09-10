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
  toValidationResult,
  getIsValid
} from "modusbox-ui-components/dist/redux-validation";
import { getUserValidators } from "./validators";
import { createSelector } from "reselect";
// import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from "lodash/find";
// import get from 'lodash/get';

export const getIsUsersLoading = state => state.users.isUsersLoading;
export const getUsers = state => state.users.users;
export const getSelectedUsers = state => state.users.selectedUsers;
export const getUser = state => state.users.user;
export const getIsUserNew = state => state.users.isUserNew;
export const getUserId = state => state.users.userId;
export const getIsUserModalVisible = state => state.users.isModalVisible;

const getIdType = createSelector(
  getUser,
  user => user.idType
);
const getIdValue = createSelector(
  getUser,
  user => user.idValue
);

const getIsIdTypeAndValidUnique = createSelector(
  getUserId,
  getIdType,
  getIdValue,
  getUsers,
  (userId, idType, idValue, users) =>
    !find(users, user => {
      return (
        user.idType === idType &&
        user.idValue === idValue &&
        (userId.idType !== user.idType || userId.idValue !== user.idValue)
      );
    })
);

const getUserValidation = createSelector(
  getIdType,
  getIdValue,
  getIsIdTypeAndValidUnique,
  getUserValidators
);
export const getUserValidationResult = createSelector(
  getUser,
  getUserValidation,
  toValidationResult
);

export const getIsUserValid = createSelector(
  getUserValidationResult,
  getIsValid
);

export const getIsSubmitEnabled = createSelector(
  getIsUserValid,
  isValid => isValid
);
