import {json, redirect, useRouteLoaderData, defer, Await} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import {Suspense} from "react";

function EventDetailPage(){
  const {event, events} = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent}/>}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList event={loadedEvents}/>}
        </Await>
      </Suspense>

    </>

  )
}

export  default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
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

export async function loader({request, params}) {
  const id = params.id;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  })
}


export async function action({request, params}) {
  const id = params.id;
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method
  });
  if (!response.ok) {
    throw json({message: 'Could not delete event.'}, {status: 500});
  }
  return redirect('/events');
}
