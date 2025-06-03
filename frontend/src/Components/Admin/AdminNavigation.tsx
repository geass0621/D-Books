import { Link } from "react-router-dom";

const AdminNavigation: React.FC = () => {
  return (
    <div className="navbar max-w-full h-0.5 bg-base-100" >
      <div className="navbar-start" >
        <Link className="btn btn-ghost text-lg" to={"/admin/adminOrders"}>
          Orders
        </Link>
        <button className="btn btn-ghost text-lg">
          Books
        </button>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNavigation;