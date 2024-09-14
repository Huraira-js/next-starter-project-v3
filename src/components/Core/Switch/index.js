import classes from "./Switch.module.css";
import PropTypes from "prop-types";

export const Switch = ({ value, setter, disabled = false }) => {
  return (
    <>
      <style jsx>
        {`
          input:checked + .${classes.slider} {
            background-color: var(--secondary-color) !important;
          }
          .${classes.slider} {
            background-color: var(--input-background-color);
          }
        `}
      </style>
      <label className={classes.switch}>
        <input type="checkbox" checked={value} disabled={disabled} />
        <span
          className={`${[classes.slider, classes.round].join(" ")}`}
          onClick={() => {
            !disabled && setter(!value);
          }}
        ></span>
      </label>
    </>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  setter: PropTypes.func,
  disabled: PropTypes.bool,
};
Switch.defaultProps = {
  value: false,
};
