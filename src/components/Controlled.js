import { _filter_state } from "./states";
import { useRecoilState } from "recoil";

function Controlled({ render }) {
  const [filters, setFilters] = useRecoilState(_filter_state);

  return <div>{render(filters.controlled)}</div>;
}

export default Controlled;
