import { useRef, useCallback, useState } from "react";

const SideBar = ({
  items,
  itemsRender,
  children,
  selected_data,
  setPage,
  has_more,
  className,
}) => {
  const [hidden, setHidden] = useState(false);
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
    <div value={{ last_element_ref }} className="sidebar ">
      <div
        className="toggle-button"
        style={{
          width: !hidden ? "100%" : "auto",
          background: hidden ? "none" : "white",
        }}
      >
        <img
          onClick={() => setHidden(!hidden)}
          src={
            hidden
              ? "https://img.icons8.com/external-dreamstale-lineal-dreamstale/344/external-options-music-dreamstale-lineal-dreamstale.png"
              : "https://img.icons8.com/ios-glyphs/344/delete-sign.png"
          }
          className="icon--small"
        />
      </div>
      <div
        className="sidebar__contents"
        style={{
          display: hidden ? "none" : "block",
          width: hidden ? 0 : "inherit",

          transition: "width  0.5s ease-in-out",
        }}
      >
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
