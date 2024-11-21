import "./GroupWidget.styles.scss";
import { IoIosAdd } from "react-icons/io";
import { FaHiking } from "react-icons/fa";
import { FaLocationDot, FaPeopleGroup } from "react-icons/fa6";

export const GroupWidget = ({ group_details }) => {
  return (
    <div className="group-widget">
      {group_details.map((group) => (
        <div key={group.id} className="user-card">
          <img
            src={group.coverImage}
            alt={`${group.groupName}'s profile`}
            className="profile-img"
          />
          <div className="details">
            <h3>{group.groupName}</h3>
            <p className="location">
              <FaLocationDot /> {group.location}
            </p>
            <p className="description">{group.description}</p>
            <div className="figures">
              <p>
                <FaPeopleGroup /> {group.totalTrips}
              </p>
              <p>
                <FaHiking /> {group.totalMembers}
              </p>
            </div>
            <div className="tags">
              <span>{group.tags}</span>
            </div>
          </div>
          <div className="buttons">
            <button>Details</button>
            <button className="joining">AED {group.joiningFees}</button>
          </div>
        </div>
      ))}
    </div>
  );
};
