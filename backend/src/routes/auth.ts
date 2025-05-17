import { Router } from "express";
import { signup } from "../controllers/auth";
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
      .isLength({ min: 6, max: 12 }),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match!')
        } else {
          return true
        }
      })
  ], signup)

export default router