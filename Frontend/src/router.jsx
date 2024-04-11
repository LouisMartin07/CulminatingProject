import App from "./App";
import HomePage from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import { createBrowserRouter } from "react-router-dom";
import { userConfirmation } from "./utils/account";
// import Settings from "./pages/settings/Settings";
// import Calendar from "./pages/calendar/Calendar";
// import HiveData from "./pages/hivedata/HiveData";
// import Analytics from "./pages/analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
      // {
      //   path: "calendar",
      //   element: <Calendar />,
      // },
      // {
      //   path: "hivedata",
      //   element: <HiveData />,
      // },
      // {
      //   path: "analytics",
      //   element: <Analytics />,
      // },
    ],
  },
]);

export default router;
