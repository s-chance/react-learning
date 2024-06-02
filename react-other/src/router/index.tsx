import Detail from "@/pages/Detail";
import Home from "@/pages/Home";
import {
  createBrowserRouter,
  RouterProvider as Provider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
]);

const RouterProvider = () => {
  return <Provider router={router} />;
};

export { RouterProvider };
