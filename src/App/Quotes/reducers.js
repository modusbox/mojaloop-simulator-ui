import { handleActions } from 'redux-actions';
import { isDevelopment } from 'utils/env';
import {
  SET_QUOTES_LOADING,
  UNSET_QUOTES_LOADING,
  
} from './actions';

const initialState = {
  isQuotesLoading: true,
  quotes: [{date: '11/22/33'},{date: '11/22/33'},{date: '11/22/33'}], // [],
  quoteResponses: [null, null, null],
};

const Quotes = handleActions(
  {
    [SET_QUOTES_LOADING]: (state, action) => ({
      ...state,
      isQuotesLoading: true,
    }),
    [UNSET_QUOTES_LOADING]: (state, action) => ({
      ...state,
      isQuotesLoading: false,
    }),
    
  },
  initialState
);

export default Quotes;
export { initialState };
