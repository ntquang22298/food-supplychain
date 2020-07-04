import { authService } from 'services/auth.services';
import { toast } from 'react-toastify';

export const auth = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};
export const signIn = (username, password) => async (dispatch) => {
  try {
    let res = await authService.signIn(username, password);

    toast.success(res.msg);
    dispatch({
      type: auth.LOGIN,
      isAuthenticate: true,
      user: res.user,
    });
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
export const signOut = () => (dispatch) => {
  authService.signOut();
  dispatch({
    type: auth.LOGOUT,
    isAuthenticate: false,
  });
};

export const changePassword = (password) => async (dispatch) => {
  try {
    let res = await authService.changePassword(password);
    toast.success(res.data.msg);
  } catch (error) {
    if (error.response) toast.error(error.response.data.msg);
    else toast.error('Internal server error');
  }
};
