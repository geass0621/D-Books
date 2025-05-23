import { JSX } from "react";
import ThemeController from "./ThemeSelector"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, userActions } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MainNavigation: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    // delete cookie
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    // remove user from store
    dispatch(userActions.setUserLogout());

    return navigate('/');
  }

  const loginHandler = () => {
    navigate('/auth?mode=login');
  }
  return <>
    <header className="flex p-8 m-auto justify-center" >
      <div className="navbar max-w-5xl h-0.5 bg-base-100" >
        <div className="navbar-start" >
          <a className="btn btn-ghost text-lg" > daisyUI </a>
        </div>
        < div className="navbar-center hidden lg:flex" >
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          {user.id ?
            <button className="btn btn-ghost" onClick={logoutHandler}>Logout</button> : <button className="btn btn-ghost" onClick={loginHandler}>Login</button>}
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation