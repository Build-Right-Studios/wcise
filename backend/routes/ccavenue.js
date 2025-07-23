const express = require('express');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();

router.post('/pay', (req, res) => {
  const { amount, name, email, currency, paperId } = req.body;

  const orderId = `ORDER_${Date.now()}`;
  const merchant_id = process.env.MERCHANT_ID;
  const access_code = process.env.ACCESS_CODE;
  const working_key = process.env.WORKING_KEY;
  const redirect_url = process.env.REDIRECT_URL;
  const cancel_url = process.env.CANCEL_URL;

  let data = `merchant_id=${merchant_id}&order_id=${orderId}&currency=${currency}&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&language=EN&billing_name=${name}&billing_email=${email}&merchant_param1=${paperId}`;

  const encryptedData = encrypt(data, working_key);

  // Create an HTML form to auto-submit
  const htmlForm = `
<form id="ccavenueForm" method="post" target="_top" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
      <input type="hidden" name="encRequest" value="${encryptedData}" />
      <input type="hidden" name="access_code" value="${access_code}" />
    </form>
    <script>document.getElementById('ccavenueForm').submit();</script>
  `;

  res.send(htmlForm);
});

function encrypt(plainText, workingKey) {
  const iv = Buffer.from('0123456789abcdef'); // Fixed 16-byte IV
  const key = Buffer.from(workingKey, 'utf8');
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

module.exports = router;
