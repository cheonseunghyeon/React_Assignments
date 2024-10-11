import { createBrowserRouter, Outlet } from 'react-router-dom';
import { pageRoutes } from '@/apiRoutes';
import { RootErrorBoundary } from '@/pages/common/components/RootErrorHandler';
import { RootSuspense } from '@/pages/common/components/RootSuspense';
import { ErrorPage } from '@/pages/error/components/ErrorPage';
import { NotFoundPage } from '@/pages/error/components/NotFoundPage';
import React, { Suspense, lazy } from 'react';
import Toast from './components/ui/toast';

// React.lazy로 컴포넌트를 동적 import
const Home = lazy(() => import('@/pages/home'));
const RegisterPage = lazy(() => import('@/pages/register'));
const LoginPage = lazy(() => import('@/pages/login'));
const Cart = lazy(() => import('@/pages/cart'));
const Purchase = lazy(() => import('@/pages/purchase'));

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Toast />
      <Outlet />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.main,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.register,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.cart,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.purchase,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Purchase />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
