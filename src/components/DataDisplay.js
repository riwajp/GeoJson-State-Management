import Map from "./Map";
import SideBar from "./SideBar";
import { filter } from "./utils";

const DataDisplay = ({
  filter_schema,
  uncontrolled_filters,
  data,
  controlled_filters,
}) => {
  const filterData = () => {
    if (data !== null) {
      let filtered_data = data;
      for (const schema of filter_schema) {
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
    <div>
      {" "}
      <SideBar data={filtered_data} /> <Map data={filtered_data} />
    </div>
  );
};

export default DataDisplay;
