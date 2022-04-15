const SideBarItem = ({ item, selected }) => {
  return (
    <div>
      {selected ? (
        <div className="sidebar-item sidebar-item-selected">
          This is {item?.properties.name}. (selected)
        </div>
      ) : (
        <div className="sidebar-item">This is {item.properties.name}.</div>
      )}
    </div>
  );
};

export default SideBarItem;
