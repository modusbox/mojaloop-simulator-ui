import { createAction } from "redux-actions";
import find from "lodash/find";
import api from "utils/api";
import { is20x } from "utils/http";
import { loadFile, downloadFile } from "utils/html";
import { showSuccessToast, showErrorToast } from "../actions";
import { getUserId, getUser, getUsers, getSelectedUsers } from "./selectors";

export const SET_USERS_LOADING = "Users / Set Is Loading";
export const UNSET_USERS_LOADING = "Users / Unset Is Loading";
export const SET_USERS = "Users / Set users";
export const SELECT_USERS = "Users / Select";
export const SHOW_USER_MODAL = "Users / Show Modal";
export const HIDE_USER_MODAL = "Users / Hide Modal";
export const SET_USER_MODAL_MODEL = "Users / Set Modal Model";
export const CHANGE_USER_DISPLAY_NAME = "Users / change user display name";
export const CHANGE_USER_FIRST_NAME = "Users / change user first name";
export const CHANGE_USER_LAST_NAME = "Users / change user last name";
export const CHANGE_USER_MIDDLE_NAME = "Users / change user middle name";
export const CHANGE_USER_DATE_OF_BIRTH = "Users / change user dateOfBirth";
export const CHANGE_USER_ID_TYPE = "Users / change user id type";
export const CHANGE_USER_ID_VALUE = "Users / change user id value";

export const setUsersLoading = createAction(SET_USERS_LOADING);
export const unsetUsersLoading = createAction(UNSET_USERS_LOADING);
export const setUsers = createAction(SET_USERS);
export const selectUsers = createAction(SELECT_USERS);
export const showUserModal = createAction(SHOW_USER_MODAL);
export const hideUserModal = createAction(HIDE_USER_MODAL);
export const setUserModalModel = createAction(SET_USER_MODAL_MODEL);
export const changeUserDisplayName = createAction(CHANGE_USER_DISPLAY_NAME);
export const changeUserFirstName = createAction(CHANGE_USER_FIRST_NAME);
export const changeUserLastName = createAction(CHANGE_USER_LAST_NAME);
export const changeUserMiddleName = createAction(CHANGE_USER_MIDDLE_NAME);
export const changeUserDateOfBirth = createAction(CHANGE_USER_DATE_OF_BIRTH);
export const changeUserIdType = createAction(CHANGE_USER_ID_TYPE);
export const changeUserIdValue = createAction(CHANGE_USER_ID_VALUE);

export const initUsers = () => async (dispatch, getState) => {
  await dispatch(storeUsers());
};

const storeUsers = () => async (dispatch, getState) => {
  const { data, status } = await dispatch(api.parties.read());
  if (is20x(status)) {
    dispatch(setUsers(data));
  } else {
    dispatch(showErrorToast("error fetching users"));
  }
};

export const openNewUserModal = () => async (dispatch, getState) => {
  dispatch(showUserModal());
};

export const openEditUserModal = model => async (dispatch, getState) => {
  dispatch(setUserModalModel(model));
  dispatch(showUserModal());
};

export const deleteUser = user => async (dispatch, getState) => {
  const { status } = await dispatch(
    api.party.delete({ idType: user.idType, idValue: user.idValue })
  );
  if (is20x(status)) {
    dispatch(storeUsers());
    dispatch(showSuccessToast());
  } else {
    dispatch(showErrorToast("Delete failed"));
  }
};

export const submitUserModal = () => async (dispatch, getState) => {
  const userId = getUserId(getState());
  const user = getUser(getState());
  let status;

  let response;
  if (userId) {
    response = await dispatch(
      api.party.update({
        idType: userId.idType,
        idValue: userId.idValue,
        body: user
      })
    );
  } else {
    response = await dispatch(api.parties.create({ body: user }));
  }
  ({ status } = response);

  if (is20x(status)) {
    dispatch(showSuccessToast(userId ? "User updated" : "User created"));
    dispatch(hideUserModal());
    dispatch(storeUsers());
  } else {
    dispatch(showErrorToast("An error occurred"));
  }
};


export const exportUsers = () => async (dispatch, getState) => {
  const users = getSelectedUsers(getState());
  const jsonFile = JSON.stringify(users, null, 2);
  downloadFile(jsonFile, 'users.json');
  dispatch(selectUsers([]));
  dispatch(storeUsers());
}

export const importUsers = () => async (dispatch, getState) => {
  const isUser = item => 
    item.displayName !== undefined &&
    item.firstName !== undefined &&
    item.middleName !== undefined &&
    item.lastName !== undefined &&
    item.dateOfBirth !== undefined &&
    item.idType !== undefined &&
    item.idValue !== undefined;

  try {
    const txt = await loadFile('.json');
    const users = JSON.parse(txt);
    if (!users.length) {
      dispatch(showErrorToast('No users'));
      return;
    }
    if (!users.every(isUser)) {
      dispatch(showErrorToast('Unable to read users'));
      return;
    }
    const existingUsers = getUsers(getState());
    const usersToCreate = users.filter(user => !find(existingUsers, user));
    const apiCalls = usersToCreate.map(user => dispatch(api.parties.create({ body: user })));
    await Promise.all(apiCalls);
  } catch (e) {
    dispatch(showErrorToast(`Error occurred: ${e.message}`));
  }
  dispatch(storeUsers());
}