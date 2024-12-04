import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  try {
    const existing_user = await User.findOne({ $or : [{username}, {email} ]});
    if(existing_user){
      return res.status(403).json({ message : "user already exists" })
    };
    const hashedPassword = await bcrypt.hash(password, 12)
    const new_user = new User({ fullName, username, email, password : hashedPassword });
    await new_user.save();
    return res.status(200).json({ message : "created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Error signing up" });
  }
}