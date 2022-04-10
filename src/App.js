import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useState, useEffect } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  console.log("App");
  const [form_schema, setFormSchema] = useState([]);
  const [filter_schema, setFilterSchema] = useState([]);
  const [uncontrolled_filters, setUncontrolledFilters] = useState({});
  const [controlled_filters, setControlledFilters] = useState({});
  const [data, setData] = useState();

  //fetch data here
  useEffect(() => {
    setData(geojson_data.features);
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
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
      }}
    >
      <div className="App">
        {data && (
          <div>
            <DataDisplay
              filter_schema={filter_schema}
              uncontrolled_filters={uncontrolled_filters}
              controlled_filters={controlled_filters}
              data={data}
            />
            <Filters
              form_schema={form_schema}
              setUncontrolledFilters={setUncontrolledFilters}
              setControlledFilters={setControlledFilters}
              controlled_filters={controlled_filters}
            />
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
