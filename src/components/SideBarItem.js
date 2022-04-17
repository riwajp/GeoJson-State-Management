import { useContext } from "react";
import { DataContext } from "./DataDisplay";
const SideBarItem = ({ item, index, render, last_element_ref }) => {
  const { setSelectedData, filtered_data } = useContext(DataContext);

  return (
    <div
      ref={index === filtered_data.length - 1 ? last_element_ref : null}
      onClick={() => setSelectedData(item.properties)}
    >
      {render()}
    </div>
  );
};

export default SideBarItem;
