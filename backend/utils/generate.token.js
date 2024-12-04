import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export const generateTokenAndSetCookie = async (user, res) => {
  const payload = { id: user._id, username: user.username };
  
  try {
    // Generate the JWT token
    const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: '15h' });

    // Set the token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60 * 1000, sameSite: 'Strict' });

    res.status(200).json({ message: 'Token generated and cookie set successfully' });

  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
