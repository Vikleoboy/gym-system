import { Navigate, useRoutes } from 'react-router-dom';
import { useContext } from 'react';

import { usr } from './firebase/userContext';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import { AddUser } from './pages/AddUser';
import { AddDataBase } from './pages/AddDataBase';

import { Product } from './pages/product';
import { Editor } from './pages/Editor';
import { Edit } from './pages/Edit';
import { Whatsapp } from './pages/WhatsAppText';

// ----------------------------------------------------------------------

export default function Router() {
  const { data } = useContext(usr);
  const Log = ({ children }) => {
    console.log('Frome ROUTES ', data);
    return data ? children : <Navigate to="/login" />;
  };

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <Log>
          <DashboardLayout />
        </Log>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'addUser', element: <AddUser /> },
        { path: 'Database', element: <AddDataBase /> },
        { path: 'Product', element: <Product /> },
        { path: 'editor', element: <Editor /> },
        { path: 'editUser/:id', element: <Edit /> },
        { path: 'text', element: <Whatsapp /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
