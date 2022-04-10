import { useContext } from "react";

import { DataContext } from "./DataDisplay";
const SideBarItem = ({ state_name }) => {
  const { setSelectedData, selected_data } = useContext(DataContext);

  return (
    <div
      className={
        "sidebar-item" +
        (selected_data === state_name ? " sidebar-item-selected" : "")
      }
      onClick={() => setSelectedData(state_name)}
    >
      {state_name}
    </div>
  );
};

export default SideBarItem;
