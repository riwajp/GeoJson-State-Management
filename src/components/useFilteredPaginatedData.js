import { useEffect, useState } from "react";

const useFilteredPaginatedData = ({
  data,
  controlled_filters,
  uncontrolled_filters,
  filter_schema,
  items_per_page,
  filter,
}) => {
  //states
  const [new_filtered_data, setNewFilteredData] = useState([]);
  const [all_filtered_data, setAllFilteredData] = useState([]);
  const [has_more, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  //filter data
  useEffect(() => {
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

        setAllFilteredData(filtered_data);
        return filtered_data;
      } else {
        return [];
      }
    };

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
      setNewFilteredData(new_filtered_data);
    }
  }, [data, page, controlled_filters, uncontrolled_filters]);

  return {
    data: new_filtered_data,
    all_data: all_filtered_data,
    page,
    setPage,
    has_more,
    setHasMore,
  };
};

export default useFilteredPaginatedData;
