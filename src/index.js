import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from "./app/components/global/ErrorPage.jsx";
import App from './App';
import InfoElement from './app/pages/InfoPage.jsx';
import RealtimeElement from './app/pages/RealtimePage.jsx';
import Layout from './app/components/layout/pages.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'info',
    element: <Layout tag="info" />,
  },
  {
    path: 'realtime',
    element: <Layout tag="realtime" />,
  },
  {
    path: 'standby',
    element: <Layout tag="standby" />,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
