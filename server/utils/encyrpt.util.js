import sha256 from 'crypto-js/sha256';
import charset from '../constants/charset';

export const getSha256 = (password, salt) => {
  return sha256(salt + password).toString();
};

export const genRandomString = (length) => {
  let text = '';
  for (let i = 0; i < length; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text;
};
