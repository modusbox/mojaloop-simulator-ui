import { handleActions } from 'redux-actions';
import {
  RESET_SETTINGS,
  SET_SETTINGS_HOST,
  SET_SETTINGS_PORT,
} from './actions';

const initialState = {
  host: 'localhost',
  port: '3003',
};

const Settings = handleActions(
  {
    [RESET_SETTINGS]: (state, action) => ({
      ...initialState,
    }),
    [SET_SETTINGS_HOST]: (state, action) => ({
      ...state,
      host: action.payload,
    }),
    [SET_SETTINGS_PORT]: (state, action) => ({
      ...state,
      port: action.payload,
    }),
    
  },
  initialState
);

export default Settings;
export { initialState };
