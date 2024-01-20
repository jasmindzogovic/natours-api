/*eslint-disable*/
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    'pk_test_51Oa0qrClLOpBssJorasvC3xlycbG9WZHraharDSReQ41S2nO9ErxMaAvuw5V3ggobyYhlzn5TzTuRHxMdCS4GoYG00cPh6M27T',
  );
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
