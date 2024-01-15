import axios from 'axios';

import { showAlert } from './alert';

export const logout = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/v1/users/logout');

    if (res.data.status === 'success') {
      location.assign('/');
      showAlert('success', 'Successfully logged out.');
    }
  } catch (error) {
    showAlert('error', 'Error logging out. Try again.');
  }
};
