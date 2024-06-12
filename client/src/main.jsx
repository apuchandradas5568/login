import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Layout from "./Layout.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import StripePayment from "./pages/PaymentForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "payment",
        element: <PaymentPage/>,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: 'stripe-payment',
        element: <StripePayment/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
