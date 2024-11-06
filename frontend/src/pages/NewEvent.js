import EventForm from "../components/EventForm";
import {json, redirect} from "react-router-dom";

function NewEvent(){

  return (
    <EventForm method="post"/>
  );
}

export default NewEvent;

export async function action({request}) {
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    description: data.get('description'),
    date: data.get('date'),
    time: data.get('time'),
    image: data.get('image'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Could not save event.'}, {status: 500});
  }

  return redirect('/events')
}
