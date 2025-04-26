import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems)
  return (
    <>
    {cartItems.map((items)=>{
      return <CartItems key={items.cartID} cartItem = {items}/>
    })}
    </>
  )
}

export default CartItemsList
