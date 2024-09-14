import React from "react";
import classes from "./CustomPhoneInput.module.css";
import PhoneInput from "react-phone-number-input";

const PhoneNumberInput = ({
  label,
  value,
  setter,
  disabled,
  error = false,
  placeholder = "Phone Number",
  defaultCountry = "",
  containerClass,
  phoneInputClass,
}) => {
  return (
    <div
      className={[
        classes.phoneNumberDiv,
        containerClass && containerClass,
      ].join(" ")}
    >
      {label && <label className={classes.label}>{label}</label>}
      <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={setter}
        disabled={disabled}
        className={[
          classes.phoneNumberInput,
          phoneInputClass && phoneInputClass,
          error ? classes.error : "",
        ].join(" ")}
        defaultCountry={defaultCountry}
      />
    </div>
  );
};

export default PhoneNumberInput;
