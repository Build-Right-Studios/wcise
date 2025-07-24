const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();

router.post('/payment', (req, res) => {
  const { name, email, currency, amount, paperId } = req.body;

  const merchant_id = process.env.MERCHANT_ID;
  const access_code = process.env.ACCESS_CODE;
  const working_key = process.env.WORKING_KEY;
  const redirect_url = "https://yourfrontend.com/payment-success";
  const cancel_url = "https://yourfrontend.com/payment-failed";

  const order_id = "ORDER" + Date.now();

  const data = {
    merchant_id,
    order_id,
    currency,
    amount,
    redirect_url,
    cancel_url,
    language: "EN",
    billing_name: name,
    billing_email: email,
    merchant_param1: paperId
  };

  let str = Object.entries(data).map(([k, v]) => `${k}=${v}`).join('&');

  const encryptedData = crypto.createCipheriv('aes-128-cbc', working_key, working_key.slice(0, 16))
    .update(str, 'utf8', 'hex') + crypto.createCipheriv('aes-128-cbc', working_key, working_key.slice(0, 16))
    .final('hex');

  const html = `
    <form id="ccavenueForm" method="post" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
      <input type="hidden" name="encRequest" value="${encryptedData}" />
      <input type="hidden" name="access_code" value="${access_code}" />
    </form>
    <script>document.getElementById('ccavenueForm').submit();</script>
  `;

  res.send(html);
});

module.exports = router;
