import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useState, useEffect } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";

function App() {
  console.log("App");
  const [form_schema, setFormSchema] = useState([]);
  const [filter_schema, setFilterSchema] = useState([]);
  const [uncontrolled_filters, setUncontrolledFilters] = useState({});

  const [data, setData] = useState();

  //fetch data here
  useEffect(() => {
    setData(geojson_data.features);
    setFormSchema(form_schema_data);
    setFilterSchema(filter_schema_data);
  }, []);

  return (
    <div className="App">
      {data && (
        <div>
          <DataDisplay
            filter_schema={filter_schema}
            uncontrolled_filters={uncontrolled_filters}
            data={data}
          />
          <Filters
            form_schema={form_schema}
            setUncontrolledFilters={setUncontrolledFilters}
          />
        </div>
      )}
    </div>
  );
}

export default App;