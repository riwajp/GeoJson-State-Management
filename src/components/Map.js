import { useContext } from "react";

import { DataContext } from "./DataDisplay";
const Map = ({}) => {
  const { data, selected_data } = useContext(DataContext);
  console.log("Map");

  return (
    <div className="map">
      <h3>Map</h3>
      <br />
      <br />
      <div className="map-container">
        {data.map((d) => (
          <div
            key={d.properties.name}
            className={`map-item ${
              selected_data === d.properties.name ? "map-item-selected" : ""
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
