import { JSX, useRef, useState } from "react";
import ThemeController from "./ThemeSelector"
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user-slice";
import { Form, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { selectCart } from "../store/cart-slice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import CartComponent from "./CartCompoent";

const MainNavigation: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const cart = useAppSelector(selectCart);
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const openModalHandler = () => {
    setIsModalOpen((prevValue) => !prevValue);
  }

  const loginHandler = () => {
    navigate('/auth?mode=login');
  }
  return <>
    <header className="sticky top-0 z-50 bg-base-200 shadow flex flex-col md:flex-row p-4 md:p-8 m-auto justify-center w-full h-25">
      <div className="navbar w-full max-w-5xl h-auto bg-base-200 flex flex-col md:flex-row items-center justify-between">
        <div className="navbar-start flex-1 flex items-center">
          <ul className="menu menu-horizontal px-1">
            <li className="font-bold text-lg"><Link to="/">Home</Link></li>
            <li className="font-bold text-lg"><Link to="/books">Books</Link></li>
            {user.id && user.role === 'user' && <li className="font-bold text-lg"><Link to="/orders">Orders</Link></li>}
            {user.role === 'admin' && user.email === adminEmail && <li className="font-bold text-lg"><Link to="/admin">Admin</Link></li>}
            <li className="font-bold text-lg"><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-2xl font-bold animate-gradient-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            D-Books
          </Link>
        </div>
        <div className="navbar-end flex-1 flex items-center justify-end mt-4 md:mt-0">
          {isModalOpen &&
            <Modal modalRef={modalRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
              <CartComponent setIsModalOpen={setIsModalOpen} />
            </Modal>}
          <div className="relative mr-2">
            <span className="badge badge-sm absolute ml-8 bg-base-300">{cart.totalQuantity}</span>
            <button className="btn btn-ghost" onClick={openModalHandler}><MdOutlineShoppingCartCheckout className="scale-150" /></button>
          </div>
          {user.id ?
            <Form method="POST" action="/" className="inline">
              <button className="btn btn-ghost" type="submit">Logout</button>
            </Form>
            : <button className="btn btn-ghost" onClick={loginHandler}>Login</button>}
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation