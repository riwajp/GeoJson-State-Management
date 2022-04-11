import Map from "./Map";
import SideBar from "./SideBar";
import { filter } from "./utils";
import {
  useContext,
  createContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { AppContext } from "../App";

export const DataContext = createContext();

const DataDisplay = ({}) => {
  const {
    filter_schema,
    uncontrolled_filters,
    data,
    controlled_filters,
    setPage,
    has_more,
  } = useContext(AppContext);

  const [selected_data, setSelectedData] = useState();

  const observer = useRef();

  const last_element_ref = useCallback(
    (item) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && has_more) {
          setPage((previous_page) => previous_page + 1);
        }
      });

      if (item) observer.current.observe(item);
    },
    [data, has_more, controlled_filters, uncontrolled_filters]
  );

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
      value={{
        data: filtered_data,
        selected_data,
        setSelectedData,
        last_element_ref,
      }}
    >
      {" "}
      <SideBar /> <Map />
    </DataContext.Provider>
  );
};

export default DataDisplay;
