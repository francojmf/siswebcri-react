import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, 'unifesp-token', { expiresIn: '30d' });
  // process.env.JWT_SECRET
};
export default generateToken;
