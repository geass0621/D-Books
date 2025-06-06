import { useEffect, useState } from "react";
import { Book } from "../models/BookModel";
import { Link } from "react-router-dom";

interface CarouselProps {
  books: Book[];
}
const VISIBLE_COUNT = 4;

const initialLoadingState = (books: Book[]) => {
  return books.reduce((acc, book) => {
    acc[book.id] = true;
    return acc;
  }, {} as { [key: string]: boolean });
}

const Carousel: React.FC<CarouselProps> = ({ books }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(() => initialLoadingState(books));

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIdx((prev) => {
        if (prev >= books.length - VISIBLE_COUNT) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [books.length]);

  return (
    <div className="overflow-hidden w-full mb-5">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${VISIBLE_COUNT * 300}px`,
          transform: `translateX(-${startIdx * 303}px)`,
        }}
      >
        {
          books?.map((book, idx) => (
            <Link to={`/books/${book.id}`} className="flex-shrink-0" key={book.id + idx}>
              <div
                className="carousel-item flex-shrink-0 w-[295px] m-1 relative hover:scale-101 transition-transform duration-300"
              >
                <img
                  src={book.imageUrl}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-96 object-cover rounded-box"
                  loading="lazy"
                  style={{ opacity: imgLoading[book.id] ? 0 : 1, transition: 'opacity 0.3s' }}
                  onLoad={() => setImgLoading((prev) => ({ ...prev, [book.id]: false }))}
                />
                {imgLoading[book.id] && (
                  <div className="skeleton w-full h-96 absolute top-0 left-0"></div>
                )}
                <div className="badge badge-neutral border-0 absolute top-2 right-2 bg-accent-content bg-opacity-80 font-bold">
                  {(book.discount * 100).toFixed(0)}% OFF
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Carousel;