import { authService } from 'services/auth.services';
export const auth = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};
export const signIn = (username, password) => async (dispatch) => {
  try {
    let user = await authService.signIn(username, password);
    dispatch({
      type: auth.LOGIN,
      isAuthenticate: true,
      user: user
    });
  } catch (e) {
    console.log(e);
  }
};
export const signOut = () => (dispatch) => {
  authService.signOut();
  dispatch({
    type: auth.LOGOUT,
    isAuthenticate: false
  });
};
