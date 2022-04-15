import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useState, useEffect, createContext } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";
import SideBar from "./components/SideBar";
import SideBarItem from "./components/SideBarItem";
import SideBarHeader from "./components/SideBarHeader";

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

  //fetch forms and data
  useEffect(() => {
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
    setData(geojson_data.features);
  }, []);

  const items_per_page = 10;

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
        page,
        setPage,
        has_more,
        setHasMore,
        items_per_page,
      }}
    >
      <div className="App">
        <div>
          <DataDisplay
            sidebarRender={(items, selected_data, setSelectedData) => (
              <SideBar
                selected_data={selected_data}
                setSelectedData={setSelectedData}
                setPage={setPage}
                has_more={has_more}
                items={items}
                itemsRender={(item, selected) => (
                  <SideBarItem item={item} selected={selected} />
                )}
              >
                This is SideBar
                <SideBarHeader />
              </SideBar>
            )}
          />

          <Filters />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
