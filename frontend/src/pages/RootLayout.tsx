import MainNavigation from "../Components/MainNavigation"
import { Outlet } from "react-router-dom"

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