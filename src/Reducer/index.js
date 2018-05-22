import {combineReducers} from 'redux';
import gravyBoat from './gravyBoat';
import lastDispatchedType from './lastDispatchedType';
import ajaxCallsInProcess from './ajaxReducer/ajaxStatusReducer';

const rootReducers = combineReducers({

    lastDispatchedType,
    gravyBoat,

    ajaxCallsInProcess,
});

export default rootReducers;

