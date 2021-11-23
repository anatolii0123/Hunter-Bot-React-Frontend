import { combineReducers } from 'redux';
import wallet from './wallet';

const appReducers = combineReducers({
    wallet,
})

export default appReducers;