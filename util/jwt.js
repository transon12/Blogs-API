const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
module.exports.sign = async (user) => {
  const token = await jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET
  );
  return token;
};

module.exports.verify = async (token) => {
  const decoded = await jwt.verify(token, JWT_SECRET);
  return decoded;
};
