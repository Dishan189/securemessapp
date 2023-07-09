'use strict';

const crypto = require('crypto');

const KEY_LENGTH = 32; // Must be 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

// Creates 32 byte key (for AES-256), buffer
const createKey = () => crypto.randomBytes(KEY_LENGTH);

// Creates 16 byte iv, buffer
const createIv = () => crypto.randomBytes(IV_LENGTH);

// Encrypts given text string, using AES-256-CBC. Returns encrypted message as hex string.
const encrypt = (key, iv, text) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(text);

  return Buffer.concat([encrypted, cipher.final()]).toString('hex');
};

// Decrypts given text string. Presumes encryptedText to be hex string.
const decrypt = (key, iv, encryptedText) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = decipher.update(new Buffer(encryptedText, 'hex'));

  return Buffer.concat([decrypted, decipher.final()]).toString();
};

module.exports = { createKey, createIv, decrypt, encrypt };
