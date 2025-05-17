import { RequestHandler } from "express";

export const signup: RequestHandler = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.email;
}