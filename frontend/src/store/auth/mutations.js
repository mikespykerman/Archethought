import jwtdecode from 'jwt-decode';

export const AUTH_SUCCESS = (state, { user, token }) => {
  state.user = user;
  state.isAuthenticated = true;

  const decoded = jwtdecode(token);
  state.uid = decoded.uid;
  state.oid = decoded.oid;
};

export const SET_TOKEN = (state, token) => {
  state.token = token;
  localStorage.setItem('token', token);
};

export const REMOVE_TOKEN = (state) => {
  state.token = '';
  state.isAuthenticated = false;
};

export const LOGOUT = (state) => {
  state.user = {};
  state.uid = '';
  state.oid = '';
};
