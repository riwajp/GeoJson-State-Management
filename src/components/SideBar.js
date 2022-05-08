import { useRef, useCallback } from "react";

const SideBar = ({
  items,
  itemsRender,
  children,
  selected_data,
  setPage,
  has_more,
}) => {
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
    [items, has_more]
  );

  return (
    <div value={{ last_element_ref }}>
      <div className="sidebar">
        <div>{children}</div>
        <div>
          {" "}
          {items.map((item, index) =>
            itemsRender(item, index, last_element_ref, item === selected_data)
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
