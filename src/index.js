import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from "./app/components/global/ErrorPage.jsx";
import App from './App';
import InfoElement from './app/pages/InfoPage.jsx';
import RealtimeElement from './app/pages/RealtimePage.jsx';
import StandbyElement from './app/pages/StandbyPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'info',
    element: <InfoElement />,
  },
  {
    path: 'realtime',
    element: <RealtimeElement />,
  },
  {
    path: 'standby',
    element: <StandbyElement tag="standby" />,
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
