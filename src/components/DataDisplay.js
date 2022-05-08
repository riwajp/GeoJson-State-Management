import { createContext, useState, useEffect } from "react";
import { filter } from "./utils";
import { useRecoilState } from "recoil";
import { _filter_state, _schema_state } from "./states";
import { _data_state, _selected_data_state } from "./states";
import useFilteredPaginatedData from "./useFilteredPaginatedData";

export const DataContext = createContext();

const DataDisplay = ({ renderSideBar, items_per_page, children }) => {
  //states
  const [
    { controlled: controlled_filters, uncontrolled: uncontrolled_filters },
  ] = useRecoilState(_filter_state);
  const [data] = useRecoilState(_data_state);
  const [{ filter_schema }] = useRecoilState(_schema_state);

  const [selected_data, setSelectedData] = useRecoilState(_selected_data_state);

  const {
    data: filtered_data,
    setPage,
    has_more,
    all_data,
  } = useFilteredPaginatedData({
    data,

    controlled_filters,
    uncontrolled_filters,
    filter_schema,
    items_per_page,
    filter,
  });

  return (
    <DataContext.Provider
      value={{
        selected_data,
        setSelectedData,
        filtered_data,

        map_data:
          controlled_filters?.map_display_type == "page"
            ? filtered_data
            : all_data,
      }}
    >
      {renderSideBar(selected_data, filtered_data, has_more, setPage)}
      {children}
    </DataContext.Provider>
  );
};

export default DataDisplay;
