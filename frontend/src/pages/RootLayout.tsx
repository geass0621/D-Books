import MainNavigation from "../Components/MainNavigation"
import { Outlet, useRouteLoaderData } from "react-router-dom"
import { UserProvider } from "../store/UserContext";
const RootLayout = () => {
  const data = useRouteLoaderData("root");
  const user = data?.user;

  return <>
    <UserProvider initialUser={user}>
      <MainNavigation />
      <main>
        <Outlet />
      </main >
      <footer>
      </footer>

    </UserProvider>
  </>
}

export default RootLayout