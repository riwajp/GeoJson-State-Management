import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import data from "../data.json";
import { filtered_states_state, states_state } from "../states";
import Map from "./Map";
import SideBar from "./SideBar";

const DataDisplay = () => {
  const [states, setStates] = useRecoilState(states_state);
  const filtered_states = useRecoilValue(filtered_states_state);
  console.log("DataDisplay");

  //fetch data for first time
  useEffect(() => {
    setStates(data.features);
  }, []);
  return (
    <div>
      {" "}
      <SideBar states={filtered_states} /> <Map states={filtered_states} />
    </div>
  );
};

export default DataDisplay;
