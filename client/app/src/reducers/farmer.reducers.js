import * as actions from 'actions/farmer.actions.js';

const initialState = {
  season: null,
  seasonList: [],
  action: null,
  actionList: []
};

const FarmerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.farmer.CREATE_SEASON:
      return {
        ...state,
        season: action.season
      };
    case actions.farmer.GET_ALL_SEASON:
      return {
        ...state,
        seasonList: action.seasonList
      };
    case actions.farmer.GET_SEASON:
      return {
        ...state,
        season: action.season
      };
    case actions.farmer.EDIT_SEASON:
      return {
        ...state,
        season: action.season
      };
    case actions.farmer.DELETE_SEASON:
      return {
        ...state,
        season: action.season
      };
    case actions.farmer.CREATE_ACTION:
      return {
        ...state,
        action: action.action
      };
    case actions.farmer.GET_ALL_ACTION:
      return {
        ...state,
        actionList: action.actionList
      };
    default:
      return state;
  }
};

export default FarmerReducer;
