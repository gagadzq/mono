import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv 如果没有给,可自行设定，但必须16位
const KEY = CryptoJS.enc.Utf8.parse("ppyy12345678blog");
const IV = CryptoJS.enc.Utf8.parse('ppyy12345678blog');
/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word:string, keyStr?:string, ivStr?:string) {
  let key = KEY;
  let iv = IV;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }
  let wordStr = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(wordStr, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
/**
 1. AES 解密 ：字符串 key iv  返回base64
 2.  3. @return {string}
 */
export function Decrypt(word:string, keyStr:string, ivStr:string) {
  let key  = KEY;
  let iv = IV;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);

  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
