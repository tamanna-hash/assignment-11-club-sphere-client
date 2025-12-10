import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Clubs from "../pages/Home/clubs/Clubs";
import Events from "../pages/Home/events/Events";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/Shared/profile/Profile";
import DashboardLayout from "../layouts/DashboardLayout";
import { Component } from "react";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ErrorPage from "../pages/ErrorPage";
import ClubDetails from "../pages/Home/clubs/ClubDetails";
import EventDetails from "../pages/Home/events/EventDetails";
import AddClub from "../pages/Dashboard/manager/AddClub";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/clubs",
        Component: Clubs,
      },
      {
        path: "/clubs/:id",
        Component: ClubDetails,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/events/:id",
        Component: EventDetails,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-club",
        element: (
          <PrivateRoute>
            <AddClub />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
