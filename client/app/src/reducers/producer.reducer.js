import * as actions from 'actions/producer.actions.js';

const initialState = {
  farmer: null,
  farmerList: [],
  product: null,
  productList: [],
  productListOfFarmer: []
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
    case actions.producer.GET_FARMER_BY_USERNAME:
      return {
        ...state,
        farmer: action.farmer
      };
    case actions.producer.EDIT_FARMER:
      return {
        ...state,
        farmer: action.farmer
      };
    case actions.producer.DELETE_FARMER:
      return {
        ...state,
        farmer: action.farmer
      };
    case actions.producer.CREATE_PRODUCT:
      return {
        ...state,
        product: action.product
      };
    case actions.producer.EDIT_PRODUCT:
      return {
        ...state,
        product: action.product
      };
    case actions.producer.GET_PRODUCT:
      return {
        ...state,
        product: action.product
      };
    case actions.producer.GET_ALL_PRODUCT:
      return {
        ...state,
        productList: action.productList
      };
    case actions.producer.DELETE_PRODUCT:
      return {
        ...state,
        product: action.product
      };
    case actions.producer.GET_ALL_PRODUCT_BY_FARMER:
      return {
        ...state,
        productListOfFarmer: action.productListOfFarmer
      };
    default:
      return state;
  }
};

export default ProducerReducer;
