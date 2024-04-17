import App from "./App";
import HomePage from "./pages/homepage/homepage";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import { createBrowserRouter } from "react-router-dom";
import { userConfirmation } from "./utils/account";
import Settings from "./pages/settings/settings";
import Hives from "./pages/hivedata/hives";
import Slides from "./pages/hivedata/slides";
import Bees from "./pages/hivedata/bees";
import Calendar from "./pages/calendar/calendar";
import Analytics from "./pages/analytics/analytics";

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
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "hives",
        element: <Hives />,
      },
      {
        path: "hives/:hiveId/slides",
        element: <Slides />,
      },
      {
        path: "hives/:hiveId/slides/:slideId/bees",
        element: <Bees />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
    ],
  },
]);

export default router;
