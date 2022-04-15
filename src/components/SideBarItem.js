import { useContext } from "react";
import { DataContext } from "./DataDisplay";
import { SideBarContext } from "./SideBar";
const SideBarItem = ({ index, render }) => {
  const { setSelectedData, selected_data, filtered_data } =
    useContext(DataContext);
  const { last_element_ref } = useContext(SideBarContext);

  return (
    <div
      ref={index === filtered_data.length - 1 ? last_element_ref : null}
      onClick={() => setSelectedData(filtered_data[index].properties)}
    >
      {render()}
    </div>
  );
};

export default SideBarItem;
