import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsList = () => {
  const { products } = useLoaderData();
  return (
    <div className="mt-12 grid gap-y-8">
      {
        products.map((product) => {
          const { title, price, image,company } = product.attributes;
          const dollarAmount = price;
          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
            >
              <img src={image} alt={title} className='w-24 h-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300' />
              <div className='ml-0 sm:ml-16'>
                <h3 className='capitalize font-medium text-lg'>{title}</h3>
                <h4 className='capitalize text-neutral-content text-base'>{company}</h4>
              </div>
              <p className='font-medium ml-0 sm:ml-auto text-lg'>{formatPrice(dollarAmount)}</p>
            </Link>
          )
        })
      }
    </div>
  )
}

export default ProductsList
