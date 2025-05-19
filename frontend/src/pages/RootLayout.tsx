import { useContext, useEffect } from "react"
import MainNavigation from "../Components/MainNavigation"
import { Outlet } from "react-router-dom"
import { UserContext } from "../store/UserContext"

const RootLayout = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {

  }, [])

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