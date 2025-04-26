import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { clearCart } from "../features/cart/cartSlice";
import { logOutUser } from "../features/user/userSlice";

const Headers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const handleLogOut = () => {
    navigate('/');
    dispatch(clearCart());
    dispatch(logOutUser());
  }
  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (<div className="flex gap-x-2 sm:gap-x-8 items-center">
          <p className="text-xs sm:text-sm">Hello, {user.username}</p>
          <button className="btn btn-sm btn-outline btn-primary" onClick={handleLogOut}>logout</button>
        </div>) : (<div className="flex gap-x-6  justify-center items-center">
          <Link to={'/login'} className="link link-hover text-xs sm:text-sm">Sign In / Guest</Link>
          <Link to={'/register'} className="link link-hover text-xs sm:text-sm">Create Account</Link>
        </div>)}
        {/* {Users} */}
        {/* {LINKS} */}
      </div>
    </header>
  )
}

export default Headers
