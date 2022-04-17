import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";
import { useEffect } from "react";
import form_schema_data from "./form_schema.json";
import filter_schema_data from "./filter_schema.json";
import geojson_data from "./data.json";
import Map from "./components/Map";
import SideBar from "./components/SideBar";
import SideBarItem from "./components/SideBarItem";
import { useRecoilState } from "recoil";
import { _data_state, _schema_state } from "./components/states";

function App() {
  //states
  const [, setData] = useRecoilState(_data_state);
  const [schema, setSchema] = useRecoilState(_schema_state);

  const items_per_page = 10;

  //fetch forms and data
  useEffect(() => {
    setData(geojson_data.features);
    setSchema({
      form_schema: form_schema_data,
      filter_schema: filter_schema_data,
    });
  }, []);

  console.log("App");
  return (
    <div>
      <div className="App">
        <DataDisplay
          items_per_page={items_per_page}
          renderSideBar={(selected_data, items, has_more, setPage) => (
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
        <Filters form_schema={schema.form_schema} />
      </div>
    </div>
  );
}

export default App;
