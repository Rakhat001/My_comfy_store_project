import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch } from "../utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { generateAmountOptions } from "../utils/generateAmount";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const url = 'https://strapi-store-server.onrender.com/api/products'
const singleProductQuery = (id) =>{
  return {
    queryKey:['singleProduct',id],
    queryFn:() => customFetch(`${url}/${id}`)
  }
}


export const loaderSingleProduct = (queryClient) => async ({ params }) => {
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
  const product = response.data.data
  return {
    product
  }
}




const SingleProduct = () => {

  const { product } = useLoaderData()
  const { image, title, price, description, colors, company } = product.attributes

  const dollarAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const handleSubmit = (e) => {
    setAmount(parseInt(e.target.value))
  }

  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    productColor,
    company,
    amount
  };

  const addItemToCart = () =>{
    dispatch(addItem({product:cartProduct}))
  }



  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/products'}>Products</Link>
          </li>
        </ul>

        <div className="grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          <img src={image} alt={title} className="w-96 h-96 object-cover rounded-lg lg:w-full" />
          <div className="">
            <h1 className="capitalize text-3xl font-bold">{title}</h1>
            <h4 className="text-xl text-neutral-content font-bold mt-2">
              {company}
            </h4>
            <p className="mt-3 text-xl">{dollarAmount}</p>
            <p className="mt-6 leading-8">{description}</p>
            <div className="mt-6">
              <h4 className="font-medium text-md tracking-wider capitalize">Colors</h4>
              <div className="mt-4">
                {colors.map((color) => {
                  return <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${color === productColor ? 'border-2 border-secondary' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  >
                  </button>
                })}
              </div>
            </div>
            {/* {Amount} */}
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="label">
                <h4 className="text-md font-medium tracking-wider capitalize">
                  amount
                </h4>
                <select className="select select-secondary select-bordered select-md" id="amount" value={amount} onChange={handleSubmit}>
                  {generateAmountOptions(10)}
                </select>
              </label>
            </div>
            {/* {Cart btn} */}
            <div className="mt-10">
              <button className="btn btn-secondary btn-md" onClick={addItemToCart}>Add to bag</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
