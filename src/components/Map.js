const Map = ({ data }) => {
  console.log("Map");

  return (
    <div className="map">
      <div>Map</div>
      <br />
      <br />
      {data ? data.length : 0} data match the filters.
    </div>
  );
};

export default Map;
