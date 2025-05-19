import { Router } from "express";
import { signup, login, getUser } from "../controllers/auth";
import { body } from "express-validator";
import User from "../models/user";

const router = Router();

router.put('/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email!')
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          throw new Error('Email already exists!');
        }
      })
      .normalizeEmail(),
    body('password')
      .isAlphanumeric()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be alphanumeric and between 8 and 20 characters!'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match!')
        } else {
          return true
        }
      })
      .withMessage('Passwords do not match!')
  ], signup);

router.post('/login',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email!')
      .normalizeEmail(),
    body('password')
      .isAlphanumeric()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be alphanumeric and between 8 and 20 characters!'),
  ], login);

router.get('/user/:userId', getUser)

export default router