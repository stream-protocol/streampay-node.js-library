'use client';

import Modal from '@/components/ui/modal';
import React, { useState, useEffect } from 'react';
import { loadStripeOnramp } from '@stripe/crypto';

import {
  CryptoElements,
  OnrampElement,
} from './StripeCryptoElements'; // Importing elements related to the Stripe Onramp
import useCheckoutModal from '@/hooks/use-checkout-modal'; // Custom hook for managing the checkout modal state

// Load the Stripe Onramp with the provided test public key
const stripeOnrampPromise = loadStripeOnramp(
  'pk_test_51NXOHdARfU5KPLlVkKLfC8cLyGoElI4ruwGVRhpKLb49CYPRicAYBj1fPT6VFlQHK8US7tYKhxYqKdErqdY6iNFA00jHYWcJhr'
);

const CheckoutModal = () => {
  const checkoutModal = useCheckoutModal(); // Get checkout modal state and functions
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetches an onramp session and captures the client secret
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-onramp-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        transaction_details: {
          destination_currency: 'usdc',
          destination_exchange_amount: '13.37',
          destination_network: 'ethereum',
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  // Callback function for handling changes in the Onramp session state
  const onChange = React.useCallback(({ session }: any) => {
    setMessage(`OnrampSession is now in ${session.status} state.`);
  }, []);

  return (
    <Modal open={checkoutModal.isOpen} onClose={checkoutModal.onClose}>
      <div className='flex flex-col justify-center items-center'>
        <CryptoElements stripeOnramp={stripeOnrampPromise}>
          {clientSecret && (
            <OnrampElement
              id="onramp-element"
              clientSecret={clientSecret}
              appearance={{ theme: 'light' }}
              onChange={onChange}
              className="w-[28vw] m-4"
            />
          )}
        </CryptoElements>
        {message && <div id="onramp-message">{message}</div>}
      </div>
    </Modal>
  );
};

export default CheckoutModal;
