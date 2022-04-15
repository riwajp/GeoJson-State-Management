import { useContext, createContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { filter } from "./utils";

export const DataContext = createContext();

const DataDisplay = ({ renderSideBar, children }) => {
  //states
  const [filtered_data, setFilteredData] = useState([]);
  const [selected_data, setSelectedData] = useState();
  const {
    filter_schema,
    uncontrolled_filters,
    controlled_filters,
    page,
    setHasMore,
    data,
    items_per_page,
  } = useContext(AppContext);

  //set filtered data
  useEffect(() => {
    if (data.length) {
      const temp_filtered_data = filterData(data);
      const new_filtered_data = temp_filtered_data.slice(
        0,
        page * items_per_page
      );
      if (
        data.length &&
        temp_filtered_data.length === new_filtered_data.length
      ) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      setFilteredData(new_filtered_data);
    }
  }, [data, page, controlled_filters, uncontrolled_filters]);

  //filter data function
  const filterData = (data) => {
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
      return [];
    }
  };

  return (
    <DataContext.Provider
      value={{
        selected_data,
        setSelectedData,
        filtered_data,
      }}
    >
      {renderSideBar(selected_data, filtered_data)}
      {children}
    </DataContext.Provider>
  );
};

export default DataDisplay;
