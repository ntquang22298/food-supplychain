import { combineReducers } from 'redux';
import ProducerReducer from './producer.reducer.js';

const rootReducer = combineReducers({
    producer: ProducerReducer
});

export default rootReducer;