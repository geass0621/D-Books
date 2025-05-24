interface BookCardProps {
  id: string;
  name: string;
  author: string;
  imageUrl: string;
  price: number;
  discount: number;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  name,
  author,
  imageUrl,
  price,
  discount,
  description
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={imageUrl}
          className="h-auto w-full object-fill"
          loading="lazy"
          alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name} <span className="text-sm text-gray-500">by {author}</span>
          <div className="badge badge-secondary">${price}</div>
        </h2>
        <p>{description.length > 100 ? description.slice(0, 100) + '...' : description}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;