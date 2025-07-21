const crypto = require('crypto');

function encrypt(plainText, workingKey) {
  const m = crypto.createCipheriv('aes-128-cbc', workingKey, workingKey);
  return Buffer.from(m.update(plainText, 'utf8', 'hex') + m.final('hex')).toString();
}

module.exports = { encrypt };
