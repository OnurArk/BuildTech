import { Suspense, lazy } from 'react';
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import ProductDetail from './pages/ProductDetail';
import RootLayout from './pages/RootLayout';
import { action as authAction } from './pages/Authentication';
import { action as cartAction } from './pages/Cart';

import ErrorPage from './pages/ErrorPage';

import './App.css';
import Loaders from './components/ui/Loaders';

const Home = lazy(() => import('./pages/Home'));
const Cart = lazy(() => import('./pages/Cart'));

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
            <Suspense
              fallback={
                <Loaders
                  size={90}
                  type={'DotSpinner'}
                  height={'100vh'}
                  width={'100%'}
                  bacgroundColor={'rgb(36, 144, 251)'}
                />
              }
            >
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
          element={<ProductDetail />}
        />
      </Route>

      <Route
        path='/cart'
        loader={() => import('./pages/Cart').then((module) => module.loader())}
        element={
          <Suspense
            fallback={
              <Loaders
                size={90}
                type={'DotSpinner'}
                height={'100vh'}
                width={'100%'}
                bacgroundColor={'rgb(36, 144, 251)'}
              />
            }
          >
            <Cart />
          </Suspense>
        }
        action={cartAction}
      />
      <Route
        path='/profile'
        element={
          <Suspense
            fallback={
              <Loaders
                size={90}
                type={'DotSpinner'}
                height={'100vh'}
                width={'100%'}
                bacgroundColor={'rgb(36, 144, 251)'}
              />
            }
          >
            <Profile />
          </Suspense>
        }
        loader={() =>
          import('./pages/Profile').then((module) => module.loader())
        }
        action={(meta) =>
          import('./pages/Profile').then((module) => module.action(meta))
        }
      />
      <Route
        path='authentication'
        element={
          <Suspense
            fallback={
              <Loaders
                size={90}
                type={'DotSpinner'}
                height={'100vh'}
                width={'100%'}
                bacgroundColor={'rgb(36, 144, 251)'}
              />
            }
          >
            <Authentication />
          </Suspense>
        }
        action={authAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
