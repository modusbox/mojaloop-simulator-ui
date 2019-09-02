import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducers as api } from 'modusbox-ui-components/dist/redux-fetch';

import app from 'App/reducers';
import settings from 'App/Settings/reducers';
import users from 'App/Users/reducers';
import tester from 'App/Tester/reducers';
import results from 'App/Results/reducers';
import quotes from 'App/Quotes/reducers';
import transfer from 'App/Transfer/reducers';


const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    api,
    settings,
    app,
    users,
    results,
    quotes,
    tester,
    transfer,
  })
    
export default reducers;
