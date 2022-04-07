const Map = ({ states }) => {
  console.log("Map");

  return (
    <div className="map">
      <div>Map</div>
      <br />
      <br />
      {states !== null ? states.length : 0} states match the filters.
    </div>
  );
};

export default Map;
