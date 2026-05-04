const express = require('express');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();

const merchantKey = process.env.PAYU_MERCHANT_KEY;
const salt = process.env.PAYU_MERCHANT_SALT;
const payuBaseUrl = process.env.PAYU_ENVIRONMENT === 'TEST'
  ? 'https://test.payu.in/_payment'
  : 'https://secure.payu.in/_payment';

router.post('/initiate', (req, res) => {
  const { name, email, phone, amount, productinfo } = req.body;
  const txnid = `ORDER_${Date.now()}`;
  const formattedAmount = parseFloat(amount).toFixed(2);

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanProductinfo = productinfo.trim();

  const hashString = [
    merchantKey,
    txnid,
    formattedAmount,
    cleanProductinfo,
    cleanName,
    cleanEmail,
    '', '', '', '', '',  // udf1-udf5
    '', '', '', '', '',  // 5 more empty
    salt
  ].join('|');

  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  console.log('Environment:', process.env.PAYU_ENVIRONMENT);
  console.log('PayU URL:', payuBaseUrl);

  const payuData = {
    key: merchantKey,
    txnid,
    amount: formattedAmount,
    productinfo: cleanProductinfo,  // ✅ use clean version
    firstname: cleanName,           // ✅ use clean version (must match hash)
    email: cleanEmail,              // ✅ use clean version (must match hash)
    phone: phone || '9999999999',
    surl: `${process.env.APP_BASE}/payu/success`,  // ✅ Render backend URL
    furl: `${process.env.APP_BASE}/payu/failure`,  // ✅ Render backend URL
    hash,
  };

  const formHtml = `
    <html>
      <body onload="document.forms[0].submit()">
        <form action="${payuBaseUrl}" method="post">
          ${Object.entries(payuData)
            .map(([key, val]) => `<input type="hidden" name="${key}" value="${val}" />`)
            .join('')}
        </form>
      </body>
    </html>
  `;

  res.send(formHtml);
});

router.post('/success', (req, res) => {
  const { txnid, amount, status } = req.body;
  const frontendUrl = process.env.FRONTEND_URL || 'https://www.wcise.co.in';
  res.redirect(`${frontendUrl}/payment-success?txnid=${txnid}&amount=${amount}&status=${status}`);
});

router.post('/failure', (req, res) => {
  const { txnid, error_Message } = req.body;
  const frontendUrl = process.env.FRONTEND_URL || 'https://www.wcise.co.in';
  res.redirect(`${frontendUrl}/payment-failure?txnid=${txnid}&reason=${encodeURIComponent(error_Message || 'Payment failed')}`);
});

module.exports = router;