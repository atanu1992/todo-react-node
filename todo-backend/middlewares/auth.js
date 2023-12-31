const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const authorizationToken = req.headers['authorization'];
  if (!authorizationToken) {
    return res.status(403).send('Unauthorized access');
  }

  // check token has Bearer present
  if (!authorizationToken.includes('Bearer')) {
    return res.status(403).send('Unauthorized access');
  }
  // Bearer token, ['Bearer','token']
  let token = authorizationToken.split(' ')[1];
  if (!token) {
    return res.status(403).send('Unauthorized access');
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const createToken = (userData) => {
  const token = jwt.sign({ id: userData.id }, process.env.SECRET_TOKEN, {
    expiresIn: '2h',
  });
  return token;
};

module.exports = { verifyToken, createToken };
