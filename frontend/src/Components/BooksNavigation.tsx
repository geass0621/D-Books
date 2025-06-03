import { Link } from 'react-router-dom';
import { BookGenres } from '../common/bookGenres';
import { SortOptions } from '../common/sortOptions';

interface BooksNavigationProps {
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string, order: string) => void;
}

const BooksNavigation: React.FC<BooksNavigationProps> = ({ onGenreChange, onSortChange }) => {
  return (
    <div className="navbar max-w-full h-0.5 bg-base-100" >
      <div className="navbar-start" >
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Genres
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {
              BookGenres.map((genre, index) => (
                <li key={index}>
                  <button onClick={() => onGenreChange(genre)}>{genre}</button>
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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">Sort
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {
              SortOptions.map((option, index) => (
                <li key={index}>
                  <button onClick={() => onSortChange(option.label, option.value)}>{option.label + " " + option.value}</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BooksNavigation;