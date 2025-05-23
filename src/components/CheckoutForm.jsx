import { redirect, Form } from "react-router-dom"
import FormInput from "./FormInput"
import SubmitButton from "./SubmitButton"
import { customFetch, formatPrice } from "../utils"
import { toast } from "react-toastify"
import { clearCart } from "../features/cart/cartSlice"

export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = store.getState().userState.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;
  const info = {
    name,
    address,
    chargeTotal: orderTotal,
    numItemsInCart,
    orderTotal: formatPrice(orderTotal),
    cartItems,
  };

  try {
    const response = await customFetch.post('/orders', { data: info }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    store.dispatch(clearCart());
    toast.success('Order added')
    return redirect('/order')
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'please check your data';
    toast.error(errorMessage);
    return null;
  }
}


const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">Shipping information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className="mt-4">
        <SubmitButton text='place your order' />
      </div>
    </Form>
  )
}

export default CheckoutForm
