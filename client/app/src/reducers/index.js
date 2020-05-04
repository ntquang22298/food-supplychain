import { combineReducers } from 'redux';
import ProducerReducer from './producer.reducer.js';
import AuthReducer from './auth.reducer';
const rootReducer = combineReducers({
  producer: ProducerReducer,
  auth: AuthReducer
});

export default rootReducer;
