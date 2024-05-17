import { Outlet, RouteObject, createBrowserRouter, useRoutes} from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
//define our routes as an array of objects
export const routes : RouteObject[] = [
    {
      //for each path corresponding component will be render
      path: '/',
      element: <App/>,
      children: [
        {path: 'activities', element: <ActivityDashboard/>},
        {path: 'activities/:id', element: <ActivityDetails/>},
        {path: 'createActivity', element: <ActivityForm key= 'create'/> },
        {path: 'manage/:id', element: <ActivityForm key= 'manage'/>},
      ]
    }
  ]

export const router = createBrowserRouter(routes);

