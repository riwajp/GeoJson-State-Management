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

  const [fetched_states, setFetchedStates] = useState({
    data: [],
    form_schema: [],
    filter_schema: [],
  });

  const [filters, setFilters] = useState({ controlled: [], uncontrolled: [] });

  const [page, setPage] = useState(1);
  const [has_more, setHasMore] = useState(true);
  const items_per_page = 10;

  //fetch forms and data
  useEffect(() => {
    setFetchedStates({
      data: geojson_data.features,
      form_schema: form_schema_data,
      filter_schema: filter_schema_data,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        filter_schema: fetched_states.filter_schema,
        uncontrolled_filters: filters.uncontrolled,
        controlled_filters: filters.controlled,
        setFilters,
        form_schema: fetched_states.form_schema,
        data: fetched_states.data,
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
              setPage={setPage}
              has_more={has_more}
              items={items}
              selected_data={selected_data}
              itemsRender={(item, index, last_element_ref, selected) => (
                <SideBarItem
                  key={item.properties.name}
                  index={index}
                  item={item}
                  last_element_ref={last_element_ref}
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
