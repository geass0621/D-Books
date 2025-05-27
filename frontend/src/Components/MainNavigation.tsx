import { JSX, use, useEffect, useRef, useState } from "react";
import ThemeController from "./ThemeSelector"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, userActions } from "../store/user-slice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";
import { selectCart, cartActions } from "../store/cart-slice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Cart } from "../models/CartModel";
import CartComponent from "./CartCompoent";

const MainNavigation: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const cart = useAppSelector(selectCart);
  const localStorageCart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;


  const logoutHandler = async () => {
    // delete cookie
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // remove user from store
    dispatch(userActions.setUserLogout());

    // remove user from local storage
    localStorageCart.userEmail = '';
    localStorageCart.userId = '';
    localStorage.setItem('cart', JSON.stringify(localStorageCart));

    // // remove cart from store
    // const emptyCart: Cart = {
    //   items: [],
    //   totalPrice: 0,
    //   totalQuantity: 0,
    //   userId: '',
    //   userEmail: ''
    // };
    // dispatch(cartActions.setCart(emptyCart));

    return navigate('/');
  }

  const openModalHandler = () => {
    setIsModalOpen((prevValue) => !prevValue);
  }

  const loginHandler = () => {
    navigate('/auth?mode=login');
  }
  return <>
    <header className="flex p-8 m-auto justify-center" >
      <div className="navbar max-w-5xl h-0.5 bg-base-100" >
        <div className="navbar-start" >
          <a className="btn btn-ghost text-lg" > daisyUI </a>
        </div>
        < div className="navbar-center hidden lg:flex" >
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isModalOpen &&
            <Modal modalRef={modalRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
              <CartComponent setIsModalOpen={setIsModalOpen} />
            </Modal>}
          <div className="relative">
            <span className="badge badge-sm absolute ml-8 bg-base-300">{cart.totalQuantity}</span>
            <button className="btn btn-ghost" onClick={openModalHandler}><MdOutlineShoppingCartCheckout className="scale-150" /></button>
          </div>
          {user.id ?
            <button className="btn btn-ghost" onClick={logoutHandler}>Logout</button> : <button className="btn btn-ghost" onClick={loginHandler}>Login</button>}
          <ThemeController />
        </div>
      </div>
    </header>
  </>
}

export default MainNavigation