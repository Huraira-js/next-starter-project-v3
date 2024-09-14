import { BiSearch } from "react-icons/bi";
import { Input } from "../Input";

function SearchInput({
  value,
  setter,
  placeholder = "Search",
  customStyle,
  inputStyle,
  backgroundColor,
  iconColor = "var(--main-color)",
}) {
  return (
    <Input
      setter={setter}
      value={value}
      customStyle={{
        heigth: "100%",
        width: "400px",
        padding: "3px",
        backgroundColor: backgroundColor
          ? backgroundColor
          : "var(--white-color)",
        paddingRight: "40px",
        border: "1px solid var(--border-color)",
        ...customStyle,
      }}
      inputStyle={{
        padding: "8px 14px",
        fontSize: "var(--fs-base)",
        border: "none",
        backgroundColor: "transparent",
        borderRadius: "0",
        ...inputStyle,
      }}
      placeholder={placeholder}
      rightIcon={
        <span
          style={{
            padding: "4px",
            borderRadius: "50%",
            marginTop: "-4px",
          }}
        >
          <BiSearch
            size={22}
            color={iconColor}
            style={{
              marginTop: "-4px",
            }}
          />
        </span>
      }
    />
  );
}

export default SearchInput;
