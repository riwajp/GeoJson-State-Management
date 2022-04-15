import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useState, useEffect, createContext } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";
import Map from "./components/Map";
import SideBar from "./components/SideBar";
import SideBarItem from "./components/SideBarItem";
import { filter } from "./components/utils";

export const AppContext = createContext();

function App() {
  //states
  const [form_schema, setFormSchema] = useState([]);
  const [filter_schema, setFilterSchema] = useState([]);
  const [uncontrolled_filters, setUncontrolledFilters] = useState({});
  const [controlled_filters, setControlledFilters] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [has_more, setHasMore] = useState(true);
  const [filtered_data, setFilteredData] = useState([]);

  const items_per_page = 10;

  //fetch forms and data
  useEffect(() => {
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
    setData(geojson_data.features);
  }, []);

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
    <AppContext.Provider
      value={{
        filter_schema,
        uncontrolled_filters,
        controlled_filters,
        filtered_data,
        setControlledFilters,
        setUncontrolledFilters,
        form_schema,
        data,
        setPage,
        has_more,
      }}
    >
      <div className="App">
        <div>
          <DataDisplay>
            <SideBar>
              This is Sidebar.
              {filtered_data.map((d, index) => (
                <SideBarItem
                  key={d.properties.name}
                  index={index}
                  render={(selected_data) =>
                    selected_data ? (
                      <div className="sidebar-item sidebar-item-selected">
                        This is {d.properties.name}. (selected)
                      </div>
                    ) : (
                      <div className="sidebar-item">
                        This is {d.properties.name}.
                      </div>
                    )
                  }
                />
              ))}
            </SideBar>

            <Map />
          </DataDisplay>
          <Filters />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
