import { api } from 'boot/axios';

export const Register = async ({ dispatch }, form) => {
  await api.post('/api/v1/authentication/register/user', form);
  const user = {
    email: form.email,
    passord: form.password,
  };
  await dispatch('LogIn', user);
};

export const LogIn = async ({ commit }, payload) => {
  const res = await api.post('/api/v1/authentication/login', payload);
  const { token, user } = res.data;
  await commit('AUTH_SUCCESS', { user, token });
  await commit('SET_TOKEN', token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const LogOut = async ({ commit }) => {
  api.defaults.headers.common.Authorization = '';
  commit('LOGOUT');
};

export const init = async ({ commit }) => {
  const token = localStorage.getItem('token');
  if (token) {
    await commit('SET_TOKEN', { token });
  } else {
    commit('REMOVE_TOKEN');
  }
};
