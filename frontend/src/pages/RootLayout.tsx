import MainNavigation from "../Components/MainNavigation"
import { Outlet } from "react-router-dom"
const RootLayout: React.FC = () => {

  return <>
    <MainNavigation />
    <main className="max-w-7xl m-auto p-8">
      <Outlet />
    </main>
    <footer>
    </footer>
  </>
}

export default RootLayout