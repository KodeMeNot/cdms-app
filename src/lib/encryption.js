const crypto = require('crypto');
let CRC32 = require('js-crc').crc32;
global.Buffer = global.Buffer || require('buffer').Buffer;

exports.getEncryptedData = (inputData) => {
  // following keys will be saved in environment variables
  let key = 'RoyUrOCD44KwPKyd84wYBg==';
  let iv  = 'mTfFcmTLjlZfS0DqV4QnJg==';
  console.log(global.Buffer);
  let encryptionKey = global.Buffer.alloc(32);
  encryptionKey.write(key);
  let initializationVector = global.Buffer.alloc(16);
  initializationVector.write(iv);
  let cipher = crypto.createCipheriv( "AES-256-CBC", encryptionKey, initializationVector );
  let crypted = (
    cipher.update( JSON.stringify(inputData), "utf8", "base64" ) +
      cipher.final( "base64" )
  );
  let checksum = getChecksum(crypted);
  return {data: crypted, checksum};
};

exports.getDecryptedData = (inputData) => {
  let checksum = getChecksum(inputData.data);
  let data;
  // if (checksum === inputData.checksum) {
  //   let key = 'cHpGD1Iaho4l5WGkN6CdmA==';
  //   let iv  = '5hyBGJEGwqCIILtS79NdVw==';
  //
  //   let encryptionKey = Buffer.alloc(32);
  //   encryptionKey.write(key);
  //   let initializationVector = Buffer.alloc(16);
  //   initializationVector.write(iv);
  //   let decipher = crypto.createDecipheriv( "AES-256-CBC", encryptionKey, initializationVector );
  //   data = (
  //     decipher.update( inputData.data, "base64", "utf8" ) +
  //       decipher.final( "utf8" )
  //   );
  // }
  // return JSON.parse(data);
};

exports.getDecryptedDataHere = (inputData) => {
  // let checksum = getChecksum(inputData.data);
  // let data;
  // if (checksum === inputData.checksum) {
  //   let key = 'RoyUrOCD44KwPKyd84wYBg==';
  //   let iv  = 'mTfFcmTLjlZfS0DqV4QnJg==';
  //
  //   let encryptionKey = Buffer.alloc(32);
  //   encryptionKey.write(key);
  //   let initializationVector = Buffer.alloc(16);
  //   initializationVector.write(iv);
  //   let decipher = crypto.createDecipheriv( "AES-256-CBC", encryptionKey, initializationVector );
  //   data = (
  //     decipher.update( inputData.data, "base64", "utf8" ) +
  //       decipher.final( "utf8" )
  //   );
  // }
  // return JSON.parse(data);
};

const getChecksum = (inputData) => {
  let crcKey = 'L2nGKqmJc0wdsfyU/wEx6g==';

  let str = inputData + crcKey;
  let checksum = CRC32(str);
  return parseInt(checksum, 16);
};
