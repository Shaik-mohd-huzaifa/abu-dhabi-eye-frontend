import "./Groups.styles.scss";
import { groupPageContents } from "../../assets/data/groups";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FaHiking } from "react-icons/fa";
import { FaLocationDot, FaPeopleGroup } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../utils/API/getGroups";
import { UpdateGroups } from "../../store/Groups/Groups.actions";
import { GroupsSelector } from "../../store/Groups/Groups.selector";

export const Groups = () => {
  const groupsFromRedux = useSelector(GroupsSelector); // Get groups from Redux store
  const [localGroups, setLocalGroups] = useState([]); // Local state for groups
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groups = await getGroups(); // Fetch groups from the server
        dispatch(UpdateGroups(groups)); // Update Redux state
        setLocalGroups(groups.groups);
        console.log(groups) // Update local state
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }

    fetchGroups();
  }, [dispatch]); // Dependency array ensures `fetchGroups` runs only once on mount

  return (
    <div className="group-container">
      <h2>Groups</h2>
      <div className="description">
        <p className="des-header">{groupPageContents.groupPageDescription.title}</p>
        <p className="des-content">{groupPageContents.groupPageDescription.content}</p>
        <p className="des-callForAction">
          {groupPageContents.groupPageDescription.callToAction}
        </p>
        <p className="des-callForAction">{groupPageContents.groupPageDescription.tagline}</p>
      </div>

      <div className="listing-top">
        <p>Groups</p>
        <Link to="create">
          <button>Create Group <IoIosAdd /></button>
        </Link>
      </div>

      <div className="group-listings">
        {localGroups ? (
          localGroups.map((group, index) => (
            <div className="group-card" key={index}>
              <img
                className="cover-image"
                src={group.coverImage}
                alt="Cover Image"
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
          ))
        ) : (
          "...Loading"
        )}
      </div>
    </div>
  );
};
