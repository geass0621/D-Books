import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";
import { validationResult } from "express-validator";
import { CustomHttpError } from "../models/customError";
import jwt from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res, next) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg))
    res.status(422).json({ message: '', errors: errors });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;


  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      role: 'user'
    });

    const createdUser = await user.save();

    res.status(201).json({ message: 'User created successfully!', user: createdUser })

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};

export const login: RequestHandler = async (req, res, next) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = ['Wrong email or password!'];
    res.status(422).json({ message: '', errors: errors });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new CustomHttpError('A user with this email can not be found!', 401);
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new CustomHttpError('Wrong password!', 401);
      throw error;
    }
    let token;
    if (user.role === 'admin') {
      token = jwt.sign({
        email: user.email,
        userId: user.id.toString()
      }, process.env.ADMIN_JWT_SECRET as string, { expiresIn: '1h' })
    } else if (user.role === 'user') {
      token = jwt.sign({
        email: user.email,
        userId: user.id.toString()
      }, process.env.USER_JWT_SECRET as string, { expiresIn: '1h' })
    }

    res.status(200).json({
      token: token,
      user: {
        id: user.id.toString(),
        email: user.email,
        role: user.role
      }
    });
    return;

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};

export const getUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select('id email role');
    if (!user) {
      const error = new CustomHttpError('A user can not be found!', 401);
      throw error;
    }

    res.status(200).json({ message: 'User found!', user: user });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}