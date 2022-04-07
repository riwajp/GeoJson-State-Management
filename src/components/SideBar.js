const SideBar = ({ states }) => {
  console.log("SideBar");

  return (
    <div className="sidebar">
      <div>SideBar</div>
      <br />
      <br />
      <div>
        {states !== null &&
          states.map((state) => (
            <div key={state.properties.name}>
              {state.properties.name}=== {state.properties.density}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
