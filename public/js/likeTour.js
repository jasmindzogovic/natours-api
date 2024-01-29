import axios from 'axios';

import { showAlert } from './alert';

export const likeTour = async (data) => {
  try {
    const res = await axios.patch('/api/v1/tours/like-tour', { data });

    if (res.data.status === 'success') {
      showAlert('success', 'Liked tour successfully!');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
