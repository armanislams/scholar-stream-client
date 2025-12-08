import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomeLayout,
      },
    ],
  },
]);

export default router;