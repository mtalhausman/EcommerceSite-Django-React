import ProductList from "./pages/ProductList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import axios from "axios";
import Layout from "./Layout";
import CheckOutPage from "./pages/CheckOutPage";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRouter from "./components/PrivateRouter";

const App = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProductList />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
          loader: async ({ params }) => {
            try {
              const Base_URL = import.meta.env.VITE_DJANGO_BASE_URL;
              const response = await axios.get(
                `${Base_URL}/api/products/${params.id}/`
              );
              return response.data;
            } catch (error) {
              throw new Response("Product not found", { status: 404 });
            }
          }
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          element: <PrivateRouter />,
          children: [
            {
              path: "/checkout",
              element: <CheckOutPage />,
            }
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        }
      ]
    }
  ]
  );
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
export default App
