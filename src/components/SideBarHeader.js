import { useContext } from "react";

import { SideBarContext } from "./SideBar";
function SideBarHeader() {
  const { items } = useContext(SideBarContext);
  return <div>First Item is : {items[0]?.properties.name}</div>;
}

export default SideBarHeader;
