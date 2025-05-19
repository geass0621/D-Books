import { useContext } from "react"
import ThemeController from "./ThemeSelector"
import { UserContext } from "../store/UserContext"
import { redirect } from "react-router-dom";

const MainNavigation = () => {
  const user = useContext(UserContext);

  const logoutHandler = () => {
    user?.setUser(null);
    localStorage.removeItem('DbooksToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    redirect('/')
  }

  return <>
    <header className="flex p-8 m-auto justify-center">
      <div className="navbar max-w-5xl h-0.5 bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-lg">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end">
          {user?.user && <button className="btn btn-ghost" onClick={logoutHandler}>Logout</button>}
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation