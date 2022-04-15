import { useContext, createContext } from "react";
import { useRef, useCallback } from "react";
import { AppContext } from "../App";

export const SideBarContext = createContext();
const SideBar = ({ children }) => {
  const { data, filtered_data, setPage, has_more } = useContext(AppContext);

  const observer = useRef();
  const last_element_ref = useCallback(
    (item) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && has_more) {
          setPage((previous_page) => previous_page + 1);
        }
      });

      if (item) observer.current.observe(item);
    },
    [filtered_data, has_more]
  );

  return (
    <SideBarContext.Provider value={{ last_element_ref }}>
      <div className="sidebar">
        <div>{children}</div>
      </div>
    </SideBarContext.Provider>
  );
};

export default SideBar;
