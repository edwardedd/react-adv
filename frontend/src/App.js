import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import EventsPage, {loader as eventsLoader} from "./pages/EventsPage";
import EventDetailPage, {loader as eventDetailLoader, action as deleteAction} from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage />},
      {path: "events", element: <EventsRoot />,
        children: [
          {path: '', element: <EventsPage />, loader: eventsLoader},
          {
            path: ":id",
            id: 'event-detail',
            loader: eventDetailLoader,
            children:[
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteAction
              },
              {path: "edit", element: <EditEventPage />, action: manipulateEventAction},
            ]
          },
          {path: "new", element: <NewEvent />, action: manipulateEventAction}

        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />;
}

export default App;
