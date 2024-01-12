import axios from 'axios';

import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/v1/users/login', {
      email,
      password,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};