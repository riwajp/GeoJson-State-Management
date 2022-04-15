import { useContext } from "react";
import { DataContext } from "./DataDisplay";
const Map = ({}) => {
  const { selected_data, filtered_data } = useContext(DataContext);

  return (
    <div className="map">
      <h3>Map</h3>
      <br />
      <br />
      <div className="map-container">
        {filtered_data.map((d) => (
          <div
            key={d.properties.name}
            className={`map-item ${
              selected_data === d.properties ? "map-item-selected" : ""
            }`}
          >
            {d.properties.density}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
