import { toValidationResult, getIsValid } from 'modusbox-ui-components/dist/redux-validation';
import { getUserValidators } from './validators';
import { createSelector } from 'reselect';
// import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from 'lodash/find';
// import get from 'lodash/get';


export const getIsUsersLoading = state => state.users.isUsersLoading;
export const getUsers = state => state.users.users;
export const getUser = state => state.users.user;
export const getUserModalVisible = state => state.users.isModalVisible;


const getIdType = createSelector(getUser, user => user.idType);
const getIdValue = createSelector(getUser, user => user.idValue);

const getIsIdTypeAndValidUnique = createSelector(
  getIdType,
  getIdValue,
  getUsers,
  (idType, idValue, users) => !find(users, { idType, idValue })
)

const getUserValidation = createSelector(
  getIsIdTypeAndValidUnique,
  getUserValidators
);
export const getUserValidationResult = createSelector(
  getUser,
  getUserValidation,
  toValidationResult,
);

export const isUserValid = createSelector(
  getUserValidationResult,
  getIsValid,
);

export const isSubmitEnable = createSelector(
  isUserValid, isValid => isValid
);


