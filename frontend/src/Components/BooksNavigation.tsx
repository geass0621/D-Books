import { Link } from 'react-router-dom';
import { BookGenres } from '../common/bookGenres';

const BooksNavigation: React.FC = () => {
  return (
    <div className="navbar max-w-full h-0.5 bg-base-100" >
      <div className="navbar-start" >
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Genres</div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {
              BookGenres.map((genre, index) => (
                <li key={index}>
                  <Link to={`/books?genre=${genre}`}>{genre}</Link>
                </li>
              ))
            }
            <li>
              <Link to={`/books?genre=all`} >All Books</Link>
            </li>
          </ul>
        </div>
      </div>
      < div className="navbar-center hidden lg:flex" >

      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost text-lg" >Sort</a>
      </div>
    </div>
  );
}

export default BooksNavigation;