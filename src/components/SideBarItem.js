import { useContext } from "react";
import { DataContext } from "./DataDisplay";
const SideBarItem = ({ index, element_ref, children }) => {
  const { setSelectedData, filtered_data } = useContext(DataContext);

  return (
    <div
      ref={element_ref}
      onClick={() => setSelectedData(filtered_data[index].properties)}
    >
      {children}
    </div>
  );
};

export default SideBarItem;
