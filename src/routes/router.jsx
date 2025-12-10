import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AllScholarships from "../components/common/Scholarships/AllScholarships/AllScholarships";
import ScholarshipDetails from "../components/common/Scholarships/ScholarshipDetails.jsx/ScholarshipDetails";
import LearnMore from "../components/LandingPage/LearnMore";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomeLayout,
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/all-scholarships',
        Component: AllScholarships
      },
      {
        path: '/scholarship-details/:id',
        Component: ScholarshipDetails
      },
      {
        path: '/faq',
        Component: LearnMore
      },
      {
        path: '/payment-success',
        Component: PaymentSuccess
      },
    ],
  },
]);

export default router;