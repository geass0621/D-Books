import { Outlet } from "react-router-dom";
import BooksNavigation from "../Components/BooksNavigation";

const BooksLayout = () => {
  return (
    <>
      <BooksNavigation />
      <Outlet />
    </>
  );
}

export default BooksLayout;