import classes from "./Statuses.module.css";
export default function Statuses({ status, isLabel = true }) {
  const statusesColor = {
    available: {
      color: "#01c875",
      label: "Available",
    },
    reserved: {
      color: "#FA9940",
      label: "Reserved",
    },
    sold: {
      color: "#D54040",
      label: "Sold",
    },
  };
  return (
    <div
      className={`${classes.statusWrapper} ${!isLabel ? classes.withoutLabel : ""}`}
      style={{ backgroundColor: statusesColor[status]?.color }}
    >
      {isLabel && <p>{statusesColor[status]?.label}</p>}
    </div>
  );
}
