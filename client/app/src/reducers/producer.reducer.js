import * as actions from 'actions/producer.actions.js';

const initialState = {
  farmer: null,
  farmerList: []
};

const ProducerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.producer.CREATE_FARMER:
      return {
        ...state,
        farmer: action.farmer
      };
    case actions.producer.GET_ALL_FARMER:
      return {
        ...state,
        farmerList: action.farmerList
      };
    case actions.producer.GET_FARMER:
      return {
        ...state,
        farmer: action.farmer
      };
    default:
      return state;
  }
};

export default ProducerReducer;
