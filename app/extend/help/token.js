const jwt = require('jsonwebtoken');

let config = {}

config.security = {
  secretKey: "zzc",
  // 过期时间 3小时
  expiresIn: 60 * 60 * 24
};

// 颁布令牌
const setToken = (user) => {
  const secretKey = config.security.secretKey;
  const expiresIn = config.security.expiresIn;
  const token = jwt.sign(user, secretKey, {
    expiresIn: expiresIn
  })
  return token
}

const getUser = (token) => {
	var user = jwt.verify(token, config.security.secretKey);
	return user
}


module.exports = {
  setToken,
	getUser
}
