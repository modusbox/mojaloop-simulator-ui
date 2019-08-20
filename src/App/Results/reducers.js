import { handleActions } from 'redux-actions';
import { isDevelopment } from 'utils/env';
import {
  SET_RESULTS_LOADING,
  UNSET_RESULTS_LOADING,
  
} from './actions';

const initialState = {
  isResultsLoading: true,
};

const Results = handleActions(
  {
    [SET_RESULTS_LOADING]: (state, action) => ({
      ...state,
      isResultsLoading: true,
    }),
    [UNSET_RESULTS_LOADING]: (state, action) => ({
      ...state,
      isResultsLoading: false,
    }),
    
  },
  initialState
);

export default Results;
export { initialState };
