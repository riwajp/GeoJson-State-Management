import { useContext } from "react";

import { DataContext } from "./DataDisplay";
const SideBarItem = ({ state_name, index }) => {
  const { setSelectedData, selected_data, data, last_element_ref } =
    useContext(DataContext);

  if (index === data.length - 1) {
    return (
      <div
        ref={last_element_ref}
        className={
          "sidebar-item" +
          (selected_data === state_name ? " sidebar-item-selected" : "")
        }
        onClick={() => setSelectedData(state_name)}
      >
        {state_name}
      </div>
    );
  } else {
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
  }
};

export default SideBarItem;
