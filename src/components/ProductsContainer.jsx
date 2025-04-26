import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const total = meta.pagination.total;
  const [layout, setLayout] = useState('grid');
  const setActiveStyle = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${pattern === layout ? 'btn-primary text-primary-content' : 'btn-ghost text-based-content'}`;
  }
  return (
    <>
      {/* {Headers} */}
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-base'>
          {total} total{total > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button type='button' onClick={() => setLayout('grid')} className={setActiveStyle('grid')}>
            <BsFillGridFill />
          </button>
          <button type='button' onClick={() => setLayout('list')} className={setActiveStyle('list')}>
            <BsList />
          </button>
        </div>
      </div>
      {/* {Products} */}
      <div>
        {
          total === 0 ? <h5 className='text-lg font-bold mt-16'>
            Sorry no products matched your search!!!
          </h5> : layout === 'grid' ? <ProductsGrid /> : <ProductsList />
        }
      </div>
    </>

  )
}

export default ProductsContainer
