import { useContext, createContext, useState } from "react";
import { AppContext } from "../App";
import SideBar from "./SideBar";
import SideBarItem from "./SideBarItem";
import Map from "./Map";

export const DataContext = createContext();

const DataDisplay = () => {
  const { filtered_data, setPage, has_more } = useContext(AppContext);

  const [selected_data, setSelectedData] = useState();

  return (
    <DataContext.Provider
      value={{
        selected_data,
        setSelectedData,
        filtered_data,
      }}
    >
      {" "}
      <SideBar
        selected_data={selected_data}
        setSelectedData={setSelectedData}
        setPage={setPage}
        has_more={has_more}
        items={filtered_data}
        itemsRender={(item, selected) => (
          <div>
            {selected ? (
              <div className="sidebar-item sidebar-item-selected">
                This is {item?.properties.name}. (selected)
              </div>
            ) : (
              <div className="sidebar-item">
                This is {item.properties.name}.
              </div>
            )}
          </div>
        )}
      >
        This is SideBar
      </SideBar>
      <Map />
    </DataContext.Provider>
  );
};

export default DataDisplay;
