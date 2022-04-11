import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useState, useEffect, createContext } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";

export const AppContext = createContext();

function App() {
  console.log("App");

  //states
  const [form_schema, setFormSchema] = useState([]);
  const [filter_schema, setFilterSchema] = useState([]);
  const [uncontrolled_filters, setUncontrolledFilters] = useState({});
  const [controlled_filters, setControlledFilters] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [has_more, setHasMore] = useState(true);

  const items_per_page = 10;

  //fetch data
  useEffect(() => {
    const new_data = [
      ...data,
      ...geojson_data.features.slice(
        (page - 1) * items_per_page,
        page * items_per_page
      ),
    ];
    if (data.length === new_data.length) {
      setHasMore(false);
    } else {
      setData(new_data);
    }
  }, [page]);

  //fetch forms
  useEffect(() => {
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
    console.log("fetched forms");
  }, []);

  return (
    <AppContext.Provider
      value={{
        filter_schema,
        uncontrolled_filters,
        controlled_filters,
        data,
        setControlledFilters,
        setUncontrolledFilters,
        form_schema,
        setPage,
        has_more,
      }}
    >
      <div className="App">
        {data && (
          <div>
            <DataDisplay />
            <Filters />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
