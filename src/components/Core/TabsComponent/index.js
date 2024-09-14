"use client";
import classes from "./TabsComponent.module.css";

function TabsComponent({ data, value, onClick }) {
  return (
    <div className={classes._tabsHeading}>
      {data?.map((ele, index) => (
        <div
          className={`${classes._initialTab} ${
            value?.value === ele?.value ? classes._selectedclass : ""
          } `}
          onClick={() => onClick(ele)}
          key={index}
        >
          <p>{ele?.label}</p>
        </div>
      ))}
    </div>
  );
}

export default TabsComponent;
