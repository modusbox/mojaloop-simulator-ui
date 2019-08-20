import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducers as api } from 'modusbox-ui-components/dist/redux-fetch';

import app from 'App/reducers';
import tester from 'App/Tester/reducers';
import results from 'App/Results/reducers';
import quotes from 'App/Quotes/reducers';

const reducers = history =>
  combineReducers({
    router: connectRouter(history),
    api,
    app,
    results,
    quotes,
    tester,
  })
    
export default reducers;
