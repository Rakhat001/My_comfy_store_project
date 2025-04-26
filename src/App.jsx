import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'






import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Order, Products, Register, SingleProduct } from "./pages";
import { ErrorElement } from './components';
import { loader as LoaderPage } from './pages/Landing';
import { loaderSingleProduct } from './pages/SingleProduct';
import { loaderAllProducts } from './pages/Products'
import { loader as orderLoader } from './pages/Order'
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as orderAction } from './components/CheckoutForm'
import { loader as checkOutLoader } from './pages/Checkout'
import { store } from './store'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: LoaderPage(queryClient)
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: loaderAllProducts(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: loaderSingleProduct(queryClient)
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkOutLoader(store),
        action: orderAction(store, queryClient)
      },
      {
        path: 'order',
        element: <Order />,
        loader: orderLoader(store,queryClient)
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction
  }
])



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App
