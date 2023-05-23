import ErrorPage from "./Pages/Error/Error";
import Root from "./Routes/Root";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import RegisterOauth from "./Pages/Register/RegisterOauth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Account from "./Pages/Account/Account";
import {createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext/AuthContext";


function App() {
  const { loggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Root error={<ErrorPage />} />,
      children: [ 
        {
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "login",
              element: (!loggedIn ? <Login /> : <Navigate to="/dashboard" />)
            },
      
            {
              path: "signup",
              element: (!loggedIn ? <Register /> : <Navigate to="/dashboard" />)
            },

            {
              path: "dashboard",
              element: (loggedIn ? <Dashboard /> : <Navigate to="/login" />)
            },

            {
              path: "oauth",
              element:  <RegisterOauth />
            },

            {
              path: "account",
              element: (loggedIn ? <Account /> : <Navigate to="/login" />)
            },
          ]
        }
      ],
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
