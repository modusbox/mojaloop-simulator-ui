import { handleActions } from "redux-actions";
import {
  SET_USERS_LOADING,
  UNSET_USERS_LOADING,
  SET_USERS,
  SHOW_USER_MODAL,
  HIDE_USER_MODAL,
  SET_USER_MODAL_MODEL,
  CHANGE_USER_DISPLAY_NAME,
  CHANGE_USER_FIRST_NAME,
  CHANGE_USER_LAST_NAME,
  CHANGE_USER_MIDDLE_NAME,
  CHANGE_USER_DATE_OF_BIRTH,
  CHANGE_USER_ID_TYPE,
  CHANGE_USER_ID_VALUE
} from "./actions";

const userInitialState = {
  displayName: undefined,
  firstName: undefined,
  lastName: undefined,
  middleName: undefined,
  dateOfBirth: undefined,
  idType: undefined,
  idValue: undefined
};

const initialState = {
  isUsersLoading: false,
  users: [],
  user: userInitialState,
  userId: undefined
};

const Users = handleActions(
  {
    [SET_USERS_LOADING]: (state, action) => ({
      ...state,
      isUsersLoading: true
    }),
    [UNSET_USERS_LOADING]: (state, action) => ({
      ...state,
      isUsersLoading: false
    }),
    [SET_USERS]: (state, action) => ({
      ...state,
      users: action.payload
    }),
    [SHOW_USER_MODAL]: (state, action) => ({
      ...state,
      isModalVisible: true
    }),
    [HIDE_USER_MODAL]: (state, action) => ({
      ...state,
      isModalVisible: false,
      user: initialState.user,
      userId: initialState.userId
    }),
    [SET_USER_MODAL_MODEL]: (state, action) => ({
      ...state,
      user: action.payload,
      userId: { idType: action.payload.idType, idValue: action.payload.idValue }
    }),
    [CHANGE_USER_DISPLAY_NAME]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        displayName: action.payload
      }
    }),
    [CHANGE_USER_FIRST_NAME]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        firstName: action.payload
      }
    }),
    [CHANGE_USER_LAST_NAME]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        lastName: action.payload
      }
    }),
    [CHANGE_USER_MIDDLE_NAME]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        middleName: action.payload
      }
    }),
    [CHANGE_USER_DATE_OF_BIRTH]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        dateOfBirth: action.payload
      }
    }),
    [CHANGE_USER_ID_TYPE]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        idType: action.payload
      }
    }),
    [CHANGE_USER_ID_VALUE]: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        idValue: action.payload
      }
    })
  },
  initialState
);

export default Users;
export { initialState };
