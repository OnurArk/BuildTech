import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Home, { loader as slideLoader } from './pages/Home';

import Cart from './pages/Cart';
import Profile, { action as accountAction } from './pages/Profile';
import ProductDetail, {
  loader as detailLoader,
} from './components/content/Producs/producsDetails/ProductDetail';
import Authentication, { action as authAction } from './pages/Authentication';

import ErrorPage from './pages/ErrorPage';

import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate replace key={'toHome'} to='/home' />} />
      <Route path='/home' element={<Home />} loader={slideLoader} />
      <Route
        path='/home/:itemId'
        element={<ProductDetail />}
        loader={detailLoader}
      />

      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} action={accountAction} />
      <Route
        path='authentication'
        element={<Authentication />}
        action={authAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
