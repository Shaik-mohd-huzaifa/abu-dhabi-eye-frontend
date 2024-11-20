import "./CulturalEvents.styles.scss";
import { culturalEventsPageContent } from "../../assets/data/cultural-event";
import { IoIosAdd } from "react-icons/io";
import { FaHiking} from "react-icons/fa";
import {FaPeopleGroup, FaPersonMilitaryPointing } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getCulturalEvents } from "../../utils/API/getEvents";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEvents } from "../../store/Events/Events.actions";
import { EventsSelector } from "../../store/Events/Events.selector";

export const CulturalEvents = () => {
  const culturalevents = useSelector(EventsSelector); // Fetch events from Redux store
  const [localEvents, setLocalEvents] = useState([]); // Local state for the events
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getCulturalEvents();
        dispatch(UpdateEvents(events)); // Update Redux state
        setLocalEvents(events.events); // Update local state
        console.log(events.events)
      } catch (error) {
        console.error("Error fetching cultural events:", error);
      }
    }

    fetchEvents();
  }, [dispatch]); // Dependency array ensures `fetchEvents` runs only once on mount

  return (
    <div className="culture-events-container">
      <div className="header">
        <img src="/Middle Eastern design.png" alt="" className="image" />
        <h2>{culturalEventsPageContent.header}</h2>
        <div className="details-and-guidence">
          <p className="description">{culturalEventsPageContent.description}</p>
          <p className="topic-header">What You&apos;ll Find:</p>
          {culturalEventsPageContent.topics.map((topic, index) => (
            <p className="topic" key={index}>
              <span>- {topic.title}: </span>
              {topic.content}
            </p>
          ))}
          <p>{culturalEventsPageContent.callToAction}</p>
        </div>
      </div>

      <div className="listing-top">
        <p>Events</p>
        {/* Uncomment this if needed */}
        {/* <Link to="create"><button>Host Event <IoIosAdd/></button></Link> */}
      </div>

      <div className="events-listing">
        {localEvents.length > 0 ? (
          localEvents.map(($event, index) => (
            <div className="event-card" key={index}>
              <img
                className="cover-image"
                src={$event.eventCoverImage}
                alt="Cover Image"
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
                  <button className="host">Register</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          "...Loading"
        )}
      </div>
    </div>
  );
};
