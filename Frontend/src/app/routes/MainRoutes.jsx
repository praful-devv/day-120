import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect } from "react";
import PublicRoutes from "../protectedRoutes/PublicRoutes";
import AuthLayout from "../layout/AuthLayout";
import Login from "../features/auth/ui/Login";
import Register from "../features/auth/ui/Register";
import { useDispatch } from "react-redux";
import { MeThunk } from "../features/auth/states/authThunkSlice";
import ProtectedRoutes from "../protectedRoutes/ProtectedRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../features/home/ui/Home";

const MainRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MeThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainRoutes;
