import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";

export const signup: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      cart: [],
      role: 'user'
    });

    const createdUser = await user.save();

    res.status(200).json({ message: 'User created successfully!', user: createdUser })

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}