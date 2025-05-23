const BooksNavigation: React.FC = () => {
  return (
    <div className="navbar max-w-full h-0.5 bg-base-100" >
      <div className="navbar-start" >
        <a className="btn btn-ghost text-lg" >All Books</a>
      </div>
      < div className="navbar-center hidden lg:flex" >
        <a className="btn btn-ghost text-lg" >Fantasy</a>
        <a className="btn btn-ghost text-lg" >Science Fiction</a>
        <a className="btn btn-ghost text-lg" >Romance</a>
        <a className="btn btn-ghost text-lg" >Mystery</a>
        <a className="btn btn-ghost text-lg" >Thriller</a>
        <a className="btn btn-ghost text-lg" >Horror</a>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost text-lg" >Sort</a>
      </div>
    </div>
  );
}

export default BooksNavigation;