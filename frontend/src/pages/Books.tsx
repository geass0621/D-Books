import BookCard from "../Components/BookCard";

const Books: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookCard />
      <BookCard />
    </div>
  );
}

export default Books;