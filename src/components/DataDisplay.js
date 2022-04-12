import { useContext, createContext, useState } from "react";
import { AppContext } from "../App";

export const DataContext = createContext();

const DataDisplay = ({ children }) => {
  const { filtered_data } = useContext(AppContext);

  const [selected_data, setSelectedData] = useState();

  return (
    <DataContext.Provider
      value={{
        selected_data,
        setSelectedData,
        filtered_data,
      }}
    >
      {" "}
      {children}
    </DataContext.Provider>
  );
};

export default DataDisplay;
