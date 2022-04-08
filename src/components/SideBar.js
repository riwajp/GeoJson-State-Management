const SideBar = ({ data }) => {
  console.log("SideBar");

  return (
    <div className="sidebar">
      <div>SideBar</div>
      <br />
      <br />
      <div>
        {data &&
          data.map((d) => (
            <div key={d.properties.name}>
              {d.properties.name}=== {d.properties.density}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
