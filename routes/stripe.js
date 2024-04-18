require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  console.log('실행돼?', req, req.body);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'krw',
          product_data: {
            name: 'Sample Donation',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.COZY_CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.COZY_CLIENT_URL}/chekout-fail`,
  });

  res.send({ url: session.url });
});

module.exports = router;
