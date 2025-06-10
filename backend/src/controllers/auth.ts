import { NextFunction, RequestHandler, Request, Response } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user";
import { validationResult } from "express-validator";
import { CustomHttpError } from "../models/customError";
import jwt from 'jsonwebtoken';

export const putSignup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const validationsErrors = validationResult(req);
  if (!validationsErrors.isEmpty()) {
    let errors: any[] = [];
    validationsErrors.array().map(el => errors.push(el.msg))
    res.status(422).json({ message: '', errors: errors, success: false });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;


  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      role: 'user',
      status: 'offline',
    });

    const createdUser = await user.save();
    createdUser.cart = {
      userId: createdUser.id.toString(),
      userEmail: createdUser.email,
      items: [],
      totalPrice: 0,
      totalQuantity: 0,
      isSync: false
    };
    await createdUser.save();

    res.status(201).json({ message: 'User created successfully!', success: true, createdUser: true });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};

export const postLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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
      const error = new CustomHttpError('A user with this email can not be found!', 401, {});
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new CustomHttpError('Wrong password!', 401, {});
      throw error;
    }
    let token;
    if (user.role === 'admin') {
      token = jwt.sign({
        email: user.email,
        userId: user.id.toString(),
        role: user.role
      }, process.env.ADMIN_JWT_SECRET as string, { expiresIn: '1h' })
    } else if (user.role === 'user') {
      token = jwt.sign({
        email: user.email,
        userId: user.id.toString(),
        role: user.role
      }, process.env.USER_JWT_SECRET as string, { expiresIn: '1h' })
    }

    user.status = 'online';

    await user.save();

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
        path: "/"
      })
      .json({
        user: {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
          status: user.status
        },
        message: 'User logged in successfully!',
        success: true,
        createdUser: false,
        tokenExpiration: new Date(Date.now() + 60 * 60 * 1000).toISOString()
      });
    return;

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select('id email role status');
    if (!user) {
      const error = new CustomHttpError('A user can not be found!', 401, {});
      throw error;
    }

    const responseUser = {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
      status: user.status
    }
    res.status(200).json({ message: 'User found!', user: responseUser });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

export const postLogout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new CustomHttpError('A user can not be found!', 401, {});
      throw error;
    }
    user.status = 'offline';
    await user.save();

    res.status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
      })
      .json({ message: 'User logged out!' });

  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}