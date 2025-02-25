import crypto from 'crypto';

export const generateSHA256Hash = (input) => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

export const getBase64 = (str) => {
  return Buffer.from(str).toString('base64');
};