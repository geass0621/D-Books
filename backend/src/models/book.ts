import { Schema, model, connect } from 'mongoose';

interface IBook {
  name: string;
  author: string;
  description: string;
  price: number;
  discount: number;

}