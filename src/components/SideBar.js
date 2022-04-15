import { useRef, useCallback } from "react";

const SideBar = ({
  items,
  itemsRender,
  children,
  setPage,
  has_more,
  setSelectedData,
  selected_data,
}) => {
  //refs
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

  //return
  return (
    <div>
      <div className="sidebar">
        <div>{children}</div>
        <div>
          {items?.map((item, index) => (
            <div
              key={item.properties.name}
              index={index}
              ref={index === items.length - 1 ? last_element_ref : null}
              onClick={() => setSelectedData(item.properties)}
            >
              {itemsRender(item, item.properties === selected_data)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
