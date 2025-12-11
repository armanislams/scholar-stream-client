import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AllScholarships from "../components/common/Scholarships/AllScholarships/AllScholarships";
import ScholarshipDetails from "../components/common/Scholarships/ScholarshipDetails.jsx/ScholarshipDetails";
import LearnMore from "../components/LandingPage/LearnMore";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import PrivateRoutes from "../contexts/ProtecedRoutes/PrivateRoutes";
import HowItWorks from "../pages/FooterPages/HowItWorks";
import Blog from "../pages/FooterPages/Blog";
import HelpCenter from "../pages/FooterPages/HelpCenter";
import ContactUs from "../pages/FooterPages/ContactUs";
import SuccessStories from "../pages/FooterPages/SuccessStories";
import PrivacyPolicy from "../pages/FooterPages/PrivacyPolicy";

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
        path: '/how-it-works',
        Component: HowItWorks
      },
      {
        path: '/faq',
        Component: LearnMore
      },
      {
        path: '/blog',
        Component: Blog
      },
      {
        path: '/help-center',
        Component: HelpCenter
      },
      {
        path: '/contact-us',
        Component: ContactUs
      },
      {
        path: '/success-stories',
        Component: SuccessStories
      },
      {
        path: '/privacy-policy',
        Component: PrivacyPolicy
      },
      
      {
        path: '/all-scholarships',
        Component: AllScholarships
      },
      {
        path: '/scholarship-details/:id',
        element: <PrivateRoutes>
          <ScholarshipDetails/>
        </PrivateRoutes>
      },
      {
        path: '/payment-success',
        Component: PaymentSuccess
      },
    ],
  },
]);

export default router;