import {combineReducers} from 'redux';
import ajaxCallsInProcess from './ajaxReducer/ajaxStatusReducer';

const rootReducers = combineReducers({

    ajaxCallsInProcess,
});

export default rootReducers;

