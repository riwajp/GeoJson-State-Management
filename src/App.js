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
  const items_per_page = 10;

  //fetch forms and data
  useEffect(() => {
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
    setData(geojson_data.features);
  }, []);

  return (
    <AppContext.Provider
      value={{
        filter_schema,
        uncontrolled_filters,
        controlled_filters,
        setControlledFilters,
        setUncontrolledFilters,
        form_schema,
        data,
        setPage,
        has_more,
        setHasMore,
        page,
        items_per_page,
      }}
    >
      <div className="App">
        <DataDisplay
          renderSideBar={(selected_data, items) => (
            <SideBar
              items={items}
              selected_data={selected_data}
              itemsRender={(item, index, selected) => (
                <SideBarItem
                  key={item.properties.name}
                  index={index}
                  render={() =>
                    selected ? (
                      <div className="sidebar-item sidebar-item-selected">
                        This is {item?.properties.name}. (selected)
                      </div>
                    ) : (
                      <div className="sidebar-item">
                        This is {item.properties.name}.
                      </div>
                    )
                  }
                />
              )}
            >
              This is SideBar
            </SideBar>
          )}
        >
          <Map />
        </DataDisplay>
        <Filters />
      </div>
    </AppContext.Provider>
  );
}

export default App;
