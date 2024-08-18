import EventBaseDataRenderer from "./EventBaseDataRenderer.jsx";

function EventDetail({ data }) {
  return <article>
    <EventBaseDataRenderer {...data}/>
  </article>
}

export default EventDetail