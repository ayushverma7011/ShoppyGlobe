import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Fixed import

import store from './utils/store'; // Fixed path (single dot)
import App from './App';
import './index.css';

// Components
import ProductList from './components/ProductList';
import NotFound from './components/NotFound';
import Login from './components/Login';
import SignIn from './components/SignIn';
import OrderSuccess from './components/OrderSuccess';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Error from './components/Error';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <ProductList /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-success', element: <OrderSuccess /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

// Final Render Logic
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);