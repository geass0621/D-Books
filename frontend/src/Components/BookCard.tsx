import { useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../models/BookModel";
import { useAppDispatch } from "../store/hooks";
import { cartActions } from "../store/cart-slice";

interface BookCardProps {
  id: string;
  name: string;
  author: string;
  genre: string;
  imageUrl: string;
  price: number;
  discount: number;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  name,
  author,
  genre,
  imageUrl,
  price,
  discount,
  description
}) => {
  const formattedPrice = price.toFixed(2);
  const formattedDiscount = (discount * 100).toFixed(0);
  const discountedPrice = (price * (1 - discount)).toFixed(2);
  const [imgLoading, setImgLoading] = useState(true);
  const book: Book = {
    id,
    name,
    author,
    genre,
    imageUrl,
    price,
    discount,
    description
  }
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(book));
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:border-accent-content hover:scale-102 transition-transform duration-300">
      <Link to={`/books/${id}`} className="card-image">
        <figure className="relative w-96 h-fit">
          {imgLoading && <div className="skeleton w-dvw h-96"></div>}
          <img
            src={imageUrl}
            className="h-auto w-full object-fill"
            loading="lazy"
            alt={name}
            onLoad={() => setImgLoading(false)} />
          <div className="badge badge-neutral border-0 absolute top-2 right-2 bg-accent-content bg-opacity-80 font-bold">
            {formattedDiscount}% OFF
          </div>
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          {name} <span className="text-sm text-gray-500">by {author}</span>
          <div className="badge badge-neutral line-through font-bold">${formattedPrice}</div>
          <div className="badge badge-primary font-bold">${discountedPrice}</div>
        </h2>
        <p>{description.length > 100 ? description.slice(0, 100) + '...' : description}</p>
        <div className="card-actions justify-end">
          <div className="btn btn-accent" onClick={addToCartHandler}>Add to Cart</div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;