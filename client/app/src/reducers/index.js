import { combineReducers } from 'redux';
import ProducerReducer from './producer.reducer.js';
import FarmerReducer from './farmer.reducers';
import AuthReducer from './auth.reducer';
const rootReducer = combineReducers({
  producer: ProducerReducer,
  farmer: FarmerReducer,
  auth: AuthReducer
});

export default rootReducer;
