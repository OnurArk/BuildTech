import { Suspense, lazy } from 'react';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import { action as authAction } from './pages/Authentication';
import Cart from './pages/Cart';

import ErrorPage from './pages/ErrorPage';

import './App.css';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const Profile = lazy(() => import('./pages/Profile'));
const Authentication = lazy(() => import('./pages/Authentication'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate replace key={'toHome'} to='/home' />} />
      <Route path='home' id='carousel-load'>
        <Route
          index
          loader={() =>
            import('./pages/Home').then((module) => module.loader())
          }
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path=':itemId'
          loader={(meta) =>
            import('./pages/ProductDetail').then((module) =>
              module.loader(meta)
            )
          }
          element={
            <Suspense fallback={<p>Loading...</p>}>
              <ProductDetail />
            </Suspense>
          }
        />
      </Route>

      <Route path='/cart' element={<Cart />} />
      <Route
        path='/profile'
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <Profile />
          </Suspense>
        }
        loader={() =>
          import('./pages/Profile').then((module) => module.loader())
        }
        action={() =>
          import('./pages/Profile').then((module) => module.action())
        }
      />
      <Route
        path='authentication'
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <Authentication />
          </Suspense>
        }
        action={authAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
