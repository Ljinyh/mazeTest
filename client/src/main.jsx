import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from 'react-router-dom';

import { Main, Sign } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: () => {
      if (!window.localStorage.getItem('maze-key')) {
        return redirect('/sign');
      }
    }
  }
  , {
    path: "/sign",
    element: <Sign />,
    loader: () => {
      if (window.localStorage.getItem('maze-key')) {
        return redirect('/');
      }
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
