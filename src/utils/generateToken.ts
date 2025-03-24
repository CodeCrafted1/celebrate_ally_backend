import jwt from "jsonwebtoken"

import { jwtSecret } from "../config/config.js"

const generateToken = (user:any) => {
    return jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: '24h' }
    );
  }

export default generateToken