import {json, useLoaderData, defer, Await} from "react-router-dom";

import EventsList from '../components/EventsList';
import {Suspense} from "react";

function EventsPage() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={data.events}>
        {(events) => <EventsList events={events} />}
      </Await>
    </Suspense>
    )
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    return json(
      {message: 'Could not fetch data!'},
      {
        status: 500
      }
    )
  } else {
    const responseData = await response.json();
    return responseData.events
  }
}

export function loader(){
  return defer({
    events: loadEvents()
  })
}
