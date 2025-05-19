import { useContext, useEffect } from "react"
import MainNavigation from "../Components/MainNavigation"
import { Outlet, useLoaderData, useSubmit, useRouteLoaderData } from "react-router-dom"
const RootLayout = () => {

  return <>
    <MainNavigation />
    <main>
      <Outlet />
    </main >
    <footer>

    </footer>
  </>
}

export default RootLayout