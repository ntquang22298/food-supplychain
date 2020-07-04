import axios from 'axios';
import { authHeader } from '_helpers/auth-header';

export const authService = {
  signIn,
  signOut,
  changePassword,
};

async function signIn(username, password) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/auth/signin`,
      { username: username, password: password },
      { 'content-type': 'application/x-www-form-urlencoded' }
    );
    let user = respone.data;
    if (respone.data.success) {
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    }
    return null;
  } catch (e) {
    throw e;
  }
}

async function signOut() {
  localStorage.removeItem('user');
}

async function changePassword(password) {
  try {
    let respone = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}/auth/changePassword`,
      {
        oldPass: password.oldPass,
        newPass: password.newPass,
        confirmPass: password.confirmPass,
      },
      {
        headers: authHeader(),
      }
    );
    console.log(respone);

    return respone;
  } catch (e) {
    throw e;
  }
}
