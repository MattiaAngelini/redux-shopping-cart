import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './assets/components/App.jsx'
import store from './assets/redux/store.js';
import Cart from './assets/components/cart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/Cart",
    element: <Cart></Cart>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
  </StrictMode>,
)
