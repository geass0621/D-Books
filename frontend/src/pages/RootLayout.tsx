import { useContext, useEffect } from "react"
import MainNavigation from "../Components/MainNavigation"
import { Outlet, useLoaderData, useSubmit } from "react-router-dom"
import { UserContext } from "../store/UserContext"
import { getTokenDuration } from "../utils/auth"

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