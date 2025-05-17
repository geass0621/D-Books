import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";
import { validationResult } from "express-validator";
import { CustomHttpError } from "../models/customError";

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new CustomHttpError('Validation failed!', 422);
    throw error;
  }
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

    res.status(201).json({ message: 'User created successfully!', user: createdUser })

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}