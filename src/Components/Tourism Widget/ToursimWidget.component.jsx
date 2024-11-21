import "./TourismWidget.styles.scss";

export const TourismWidget = ({ tourism_details }) => {
  return (
    <div className="tourism-widget">
      {tourism_details.map((place) => (
        <div key={place.id} className="place-card">
          <img
            src={place.image}
            alt={`${place.name}'s profile`}
            className="cover-img"
          />
          <div className="toursim-info">
            <h3>{place.name}</h3>
            <p>{place.description}</p>
            <p className="tag">{place.type}</p>
          </div>
          <button className="details-button">Visit</button>
        </div>
      ))}
    </div>
  );
};
