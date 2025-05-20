import { useUser } from "../store/UserContext";
import ThemeController from "./ThemeSelector"
import { useRouteLoaderData, useSubmit } from "react-router-dom";

const MainNavigation = () => {
  const { user, setUser } = useUser();
  const submit = useSubmit();

  const logoutHandler = () => {
    setUser(null);
    submit(null, { method: "post", action: "/logout" });
  };

  return <>
    <header className="flex p-8 m-auto justify-center">
      <div className="navbar max-w-5xl h-0.5 bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-lg">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end">
          {user && <button className="btn btn-ghost" onClick={logoutHandler}>Logout</button>}
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation