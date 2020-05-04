import * as actions from 'actions/auth.actions';

const initialState = {
  isAuthenticate: false
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.auth.LOGIN:
      return {
        ...state,
        isAuthenticate: true
      };
    case actions.auth.LOGOUT:
      return {
        ...state,
        isAuthenticate: false
      };
    default:
      return state;
  }
};
export default AuthReducer;
