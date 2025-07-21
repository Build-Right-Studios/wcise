const express = require('express');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();

const accessCode = process.env.ACCESS_CODE || 'YOUR_ACCESS_CODE';
const workingKey = process.env.WORKING_KEY || 'YOUR_WORKING_KEY';
const merchantId = process.env.MERCHANT_ID || 'YOUR_MERCHANT_ID';
const redirectUrl = process.env.REDIRECT_URL;
const cancelUrl = process.env.CANCEL_URL;


function encrypt(plainText, workingKey) {
  const m = crypto.createCipheriv('aes-128-cbc', workingKey, workingKey);
  return Buffer.concat([m.update(plainText, 'utf-8'), m.final()]).toString('hex');
}

router.post('/pay', (req, res) => {
  const { amount, name, email } = req.body;

  const data = `merchant_id=${merchantId}&order_id=ORD${Date.now()}&currency=USD&amount=${amount}&redirect_url=${redirectUrl}&cancel_url=${cancelUrl}&language=EN&billing_name=${name}&billing_email=${email}`;

  const encRequest = encrypt(data, workingKey);

  res.send(`
    <html>
      <body>
        <form id="ccavenueForm" method="post" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction
">
          <input type="hidden" name="encRequest" value="${encRequest}">
          <input type="hidden" name="access_code" value="${accessCode}">
        </form>
        <script>document.getElementById('ccavenueForm').submit();</script>
      </body>
    </html>
  `);
});

module.exports = router;
