import { useEffect, useState } from "react";
import { Book } from "../models/BookModel";
import { Link } from "react-router-dom";

interface CarouselProps {
  books: Book[];
}
const VISIBLE_COUNT = 4;

const Carousel: React.FC<CarouselProps> = ({ books }) => {
  const [startIdx, setStartIdx] = useState(0);

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
                />
                <div className="badge absolute top-2 right-2 bg-accent-content bg-opacity-80 font-bold">
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