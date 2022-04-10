import { useContext } from "react";

import { DataContext } from "./DataDisplay";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const { data } = useContext(DataContext);

  console.log("SideBar");

  return (
    <div className="sidebar">
      <h3>SideBar</h3>
      <br />
      <br />
      <div>
        {data &&
          data.map((d) => (
            <SideBarItem
              key={d.properties.name}
              state_name={d.properties.name}
            />
          ))}
      </div>
    </div>
  );
};

export default SideBar;
