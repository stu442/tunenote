import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import { Provider } from 'jotai';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <App />
      </>
    ),
  },

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider>
      <RouterProvider router={router} />
  </Provider>
);
