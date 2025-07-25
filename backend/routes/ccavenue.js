const express = require('express');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();

// Helper to pad or slice workingKey to 16 bytes
function get16ByteKey(key) {
  const buf = Buffer.alloc(16);
  const keyBuffer = Buffer.from(key);
  keyBuffer.copy(buf, 0, 0, Math.min(keyBuffer.length, 16));
  return buf;
}

function encrypt(plainText, workingKey) {
  const key = get16ByteKey(workingKey);
  const iv = Buffer.from('0123456789abcdef', 'utf8');
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText, workingKey) {
  const key = get16ByteKey(workingKey);
  const iv = Buffer.from('0123456789abcdef', 'utf8');
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

router.post('/pay', (req, res) => {
  const { amount, name, email, currency = 'INR', paperId } = req.body;

  if (!amount || !name || !email || !paperId) {
    return res.status(400).send('Missing required payment parameters');
  }

  const orderId = `ORDER_${Date.now()}`;
  const merchant_id = process.env.MERCHANT_ID;
  const access_code = process.env.ACCESS_CODE;
  const working_key = process.env.WORKING_KEY;
  const redirect_url = process.env.REDIRECT_URL;
  const cancel_url = process.env.CANCEL_URL;

  const data = `merchant_id=${merchant_id}&order_id=${orderId}&currency=${currency}&amount=${amount}&redirect_url=${redirect_url}&cancel_url=${cancel_url}&language=EN&billing_name=${name}&billing_email=${email}&merchant_param1=${paperId}&integration_type=iframe_normal`;

  const encryptedData = encrypt(data, working_key);

  // Return JSON instead of raw HTML for frontend dynamic form submission
  res.json({ encRequest: encryptedData, access_code: access_code });
});

router.post('/response', (req, res) => {
  const workingKey = process.env.WORKING_KEY;
  const encResp = req.body.encResp;

  if (!encResp) {
    return res.status(400).send('Missing encResp from CCAvenue');
  }

  const decryptedData = decrypt(encResp, workingKey);

  const params = {};
  decryptedData.split('&').forEach(param => {
    const [key, value] = param.split('=');
    params[key] = value;
  });

  if (params.order_status === 'Success') {
    res.send(`✅ Payment Successful! Order ID: ${params.order_id}`);
  } else {
    res.send(`❌ Payment Failed. Reason: ${params.failure_message || 'Unknown'}`);
  }
});

module.exports = router;
