import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducers as api } from 'modusbox-ui-components/dist/redux-fetch';

import app from 'App/reducers';

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    api,
    app,
  })
    
export default reducers;
