import React from "react";
import "./PeopleWidget.styles.scss";

export const PeopleWidget = ({ user_details }) => {
  return (
    <div className="people-widget">
      {user_details.map((user) => (
        <div key={user.id} className="user-card">
          <img
            src={user.profile_img}
            alt={`${user.username}'s profile`}
            className="profile-img"
          />
          <div className="user-info">
            <h3>{user.username}</h3>
            <p className="info">Email: {user.email}</p>
            <p className="info">Phone: {user.phone}</p>
            <p className="info">Visiting Purpose: {user.travel_preference}</p>
          </div>
          <button className="details-button">Details</button>
        </div>
      ))}
    </div>
  );
};
