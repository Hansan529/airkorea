import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from "./app/components/global/ErrorPage.jsx";
import App from './App';
import InfoElement from './routes/info/page';
import RealtimeElement from './routes/realtime/page';

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
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
