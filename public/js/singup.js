import axios from 'axios';

import { showAlert } from './alert';

export const signup = async (data) => {
  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/v1/users/signup',
      data,
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
