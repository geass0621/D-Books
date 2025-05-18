import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";
import { validationResult } from "express-validator";
import { CustomHttpError } from "../models/customError";

export const signup: RequestHandler = async (req, res, next) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg))
    res.status(422).json({ message: '', errors: errors });
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