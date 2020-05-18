import axios from 'axios';

export const authService = {
  signIn,
  signOut
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
    console.log(e);

    throw e;
  }
}

async function signOut() {
  localStorage.removeItem('user');
}
