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
                  isFullPage={true}
                  color={'#975720'}
                  bacgroundColor={'white'}
                  bacgroundImage={
                    'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
                  }
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
        action={cartAction}
        loader={() => import('./pages/Cart').then((module) => module.loader())}
        element={
          <Suspense
            fallback={
              <Loaders
                size={90}
                type={'DotSpinner'}
                isFullPage={true}
                color={'#D07796'}
                bacgroundColor={'#170374'}
                bacgroundImage={
                  'https://img.freepik.com/free-vector/online-shopping-isometric-icon-internet-purchase-laptop-with-shop-basket-screen-online-payment_39422-973.jpg?w=900&t=st=1682520198~exp=1682520798~hmac=2b10ef08ce5a2144f9c3829e435bd7d56a626377f403310e64e41b6143c41784'
                }
              />
            }
          >
            <Cart />
          </Suspense>
        }
      />
      <Route
        path='/profile'
        element={
          <Suspense
            fallback={
              <Loaders
                size={90}
                type={'DotSpinner'}
                isFullPage={true}
                color={'#42DAC6'}
                bacgroundColor={'#B6B9C1'}
                bacgroundImage={
                  'https://cdn.dribbble.com/userupload/3719041/file/original-a961817c221095421997301577064fe4.png?compress=1&resize=1024x768'
                }
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
                type={'Ring'}
                isFullPage={true}
                color={'#05CE9A'}
                bacgroundColor={'black'}
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
