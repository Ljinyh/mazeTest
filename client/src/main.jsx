import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { Main, Sign } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
  , {
    path: "/sign",
    element: <Sign />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
