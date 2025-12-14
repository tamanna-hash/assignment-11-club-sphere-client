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
import PaymentSuccess from "../pages/Home/clubs/PaymentSuccess";
import MyInventory from "../pages/Dashboard/manager/MyInventory";
import ManageMemberships from "../pages/Dashboard/manager/ManageMemberships";
import MyMemberships from "../pages/Dashboard/Member/MyMemberships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import BecomeManager from "../pages/Dashboard/Member/BecomeManager";
import ManagerRequests from "../pages/Dashboard/Admin/ManagerRequests";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import PendingClubs from "../pages/Dashboard/manager/PendingClubs";
import PendingClubDetails from "../pages/Home/clubs/PendingClubDetails";
import UpdateClub from "../pages/Dashboard/manager/UpdateClub";
import AllPayments from "../pages/Dashboard/commonAdminManager/AllPayments";
import AddEvent from "../pages/Dashboard/manager/AddEvent";
import MyEvents from "../pages/Dashboard/manager/MyEvents";
import UpdateEvent from "../pages/Dashboard/manager/UpdateEvent";
import EventRegistrations from "../pages/Dashboard/manager/EventRegistrations";

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
        path: "/payment-success",
        Component: PaymentSuccess,
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
      // member routes
      {
        path: "my-memberships",
        element: (
          <PrivateRoute>
            <MyMemberships />
          </PrivateRoute>
        ),
      },
      {
        path: "become-manager",
        element: (
          <PrivateRoute>
            <BecomeManager />
          </PrivateRoute>
        ),
      },
      // manager routes
      {
        path: "add-club",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddClub />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "update-club/:id",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <UpdateClub />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-memberships",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ManageMemberships />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "event-registrations",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <EventRegistrations/>
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-clubs",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <PendingClubs />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-clubs/:id",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <PendingClubDetails />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <MyInventory />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <MyEvents />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-event/:id",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddEvent />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "update-event/:id",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <UpdateEvent/>
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      //  admin routes
      {
        path: "club-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageClubs />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manager-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManagerRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllPayments />
            </AdminRoute>
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
