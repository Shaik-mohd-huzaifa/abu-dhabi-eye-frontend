import { EventsWidget } from "../Event Widget/EventWidget.component";
import { GroupWidget } from "../Group Widget/GroupWidget.component";
import { PeopleWidget } from "../People Widget/PeopleWidget.component";
import { TourismWidget } from "../Tourism Widget/ToursimWidget.component";

export const Prompt = ({ prompt, type }) => {
  console.log(`RealPrompt: ${prompt}`);

  const { response, tablename, res_type } = prompt?.prompt || {};

  return (
    <div className={`prompt ${type}`}>
      {prompt.type === "user" ? (
        <p>{prompt.prompt}</p>
      ) : (
        <>
          {tablename === "user_details" && (
            <PeopleWidget user_details={response} />
          )}
          {tablename === "travel_groups" && (
            <GroupWidget group_details={response} />
          )}
          {tablename === "tourism_places" && (
            <TourismWidget tourism_details={response} />
          )}
          {tablename === "cultural_events" && (
            <EventsWidget event_details={response} />
          )}
          {res_type === "normal" && <p>My Rsp: {response}</p>}
        </>
      )}
    </div>
  );
};
