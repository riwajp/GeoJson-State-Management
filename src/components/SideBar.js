import { useContext } from "react";

import { DataContext } from "./DataDisplay";
import { useRef, useCallback } from "react";

const SideBar = ({ Item }) => {
  const { data, setPage, has_more } = useContext(DataContext);

  console.log("SideBar");

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
    [data, has_more]
  );

  return (
    <div className="sidebar">
      <h3>SideBar</h3>
      <br />
      <br />
      <div>
        {data &&
          data.map((d, index) => (
            <Item
              key={d.properties.name}
              state_name={d.properties.name}
              index={index}
              last_element_ref={last_element_ref}
            />
          ))}
      </div>
    </div>
  );
};

export default SideBar;
