import { Link } from "react-router-dom";

const AdminNavigation: React.FC = () => {
  return (
    <div className="navbar max-w-full h-0.5 bg-base-100" >
      <div className="navbar-start" >
        <Link className="btn btn-ghost text-lg" to={"/admin/orders"}>
          Orders
        </Link>
        <Link to={"/admin/add-book"} className="btn btn-ghost text-lg">
          Add Book
        </Link>
      </div>
      < div className="navbar-center hidden lg:flex" >

      </div>
      <div className="navbar-end">

      </div>
    </div>
  );
}

export default AdminNavigation;