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
    <header className="sticky top-0 z-50 bg-base-100 shadow flex flex-col md:flex-row p-4 md:p-8 m-auto justify-center w-full h-25">
      <div className="navbar w-full max-w-5xl h-auto bg-base-100 flex flex-col md:flex-row items-center justify-between">
        <div className="navbar-start w-full md:w-auto flex justify-between items-center">
          <ul className="menu menu-horizontal px-1">
            <li className="font-bold text-lg"><Link to="/">Home</Link></li>
            <li className="font-bold text-lg"><Link to="/books">Books</Link></li>
            {user.id && user.role === 'user' && <li className="font-bold text-lg"><Link to="/orders">Orders</Link></li>}
            {user.role === 'admin' && user.email === adminEmail && <li className="font-bold text-lg"><Link to="/admin">Admin</Link></li>}
            <li className="font-bold text-lg"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-center w-full md:w-auto">
        </div>
        <div className="navbar-end w-full md:w-auto flex items-center justify-end mt-4 md:mt-0">
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