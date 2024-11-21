import "./EventWidget.styles.scss";
import { FaPeopleGroup, FaPersonMilitaryPointing } from "react-icons/fa6";

export const EventsWidget = ({ event_details }) => {
  return (
    <div className="event-widget">
      {event_details.map(($event) => (
        <div key={$event.id} className="event-card">
          <img
            src={$event.event_cover_image}
            alt={`${$event.event_name}'s profile`}
            className="profile-img"
          />
          <div className="details">
            <h3>{$event.event_name}</h3>
            <p>{$event.event_description}</p>
            <div className="figures">
              <p className="">
                <FaPeopleGroup /> {$event.attendees}
              </p>
            </div>
            <div className="tags">
              <span>{$event.tag}</span>
            </div>
            <div className="host-and-join">
              <p className="host">
                <FaPersonMilitaryPointing /> {$event.host}
              </p>
            </div>
          </div>
          <button className="host">Register</button>
        </div>
      ))}
    </div>
  );
};
