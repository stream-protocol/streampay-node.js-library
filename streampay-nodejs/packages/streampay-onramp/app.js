const express = require('express');
const { Connection, SystemProgram } = require('@solana/web3.js');
const app = express();
const port = 3001;

// Initialize Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

app.get('/generatePaymentAddress', async (req, res) => {
  try {
    const payer = req.query.payer; // Payer's wallet address

    // Generate a new payment address or use an existing one
    const paymentAddress = generatePaymentAddress(payer);

    res.json({ paymentAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`StreamPay API listening at http://localhost:${port}`);
});

// Generate a payment address (simplified example)
function generatePaymentAddress(payer) {
  // You can use a Solana wallet library to generate addresses
  // For example: walletAdapter.publicKey.toBase58();
  const paymentAddress = /* Generate address logic */;

  return paymentAddress;
}
