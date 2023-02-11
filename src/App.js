import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home, { loader as slideLoader } from "./pages/Home";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetail, {
  loader as detailLoader,
} from "./components/content/Producs/producsDetails/ProductDetail";
import Authentication from "./pages/Authentication";

import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route
        path="/"
        element={<Navigate replace to="/home" />}
        errorElement={<h1 className="centered err">Some Thing Went Wrong!</h1>}
      />
      <Route path="/home" element={<Home />} loader={slideLoader} />
      <Route
        path="/home/:itemId"
        element={<ProductDetail />}
        loader={detailLoader}
      />

      <Route path="/deals" element={<Deals />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="authentication" element={<Authentication />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
