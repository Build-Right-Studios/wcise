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

  const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${name}|${email}|||||||||||${salt}`;
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  const payuData = {
    key: merchantKey,
    txnid,
    amount,
    productinfo,
    firstname: name,
    email,
    phone,
    surl: `${process.env.APP_BASE}/payu/success`,
    furl: `${process.env.APP_BASE}/payu/failure`,
    hash,
    service_provider: 'payu_paisa',
    action: payuBaseUrl
  };

  // Auto-submitting HTML form
  const formHtml = `
    <html>
      <body onload="document.forms[0].submit()">
        <form action="${payuData.action}" method="post">
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
  res.send(`<h2>✅ Payment Successful</h2><p>Transaction ID: ${req.body.txnid}</p>`);
});

router.post('/failure', (req, res) => {
  res.send(`<h2>❌ Payment Failed</h2><p>Reason: ${req.body.error_Message || 'Unknown'}</p>`);
});

module.exports = router;
