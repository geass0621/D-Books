import { Schema, model } from 'mongoose';

interface IBook {
  name: string;
  author: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
}

const bookSchema = new Schema<IBook>({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
});

const Book = model<IBook>('Book', bookSchema);

export default Book