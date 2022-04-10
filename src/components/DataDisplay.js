import Map from "./Map";
import SideBar from "./SideBar";
import { filter } from "./utils";
import { useContext, createContext } from "react";
import { AppContext } from "../App";
import { useState } from "react";

export const DataContext = createContext();

const DataDisplay = ({}) => {
  const { filter_schema, uncontrolled_filters, data, controlled_filters } =
    useContext(AppContext);

  const [selected_data, setSelectedData] = useState();

  const filterData = () => {
    if (data !== null) {
      let filtered_data = data;
      for (const schema of filter_schema.filter(
        (schema) => !schema.controlled
      )) {
        filtered_data = filter({
          data: filtered_data,
          schema: {
            ...schema,
            value:
              controlled_filters[schema.value] ||
              uncontrolled_filters[schema.value],
          },
        });
      }

      return filtered_data;
    } else {
      return null;
    }
  };

  const filtered_data = filterData();
  console.log("DataDisplay");

  return (
    <DataContext.Provider
      value={{ data: filtered_data, selected_data, setSelectedData }}
    >
      {" "}
      <SideBar /> <Map />
    </DataContext.Provider>
  );
};

export default DataDisplay;
