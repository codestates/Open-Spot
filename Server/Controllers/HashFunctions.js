const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// salt 생성 함수
// 비밀번호를 암호화 하기 위한 값이며, 유출되면 안된다.
function createSalt () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });
}

// 비밀번호를 salt로 암호화한 결과(digest)를 반환한다
function createSaltedPassword (password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);

      resolve({ saltedPassword: key.toString('base64') });
    });
  });
}

// 토큰의 유효성 검사 함수 유효하지 않은 토큰일 경우 err를 발생시킨다
function verifyToken (token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded);
    });
  });
}

module.exports = { createSalt, createSaltedPassword, verifyToken };
