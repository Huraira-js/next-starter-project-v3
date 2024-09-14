import React from "react";

export const AosContainer = ({
  delay,
  type = "fade",
  dir = "up",
  easing,
  children,
  customStyle,
  visible,
  single,
  ...props
}) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        "data-aos": dir ? `${type}-${dir}` : `${type}-up`,
        "data-aos-delay": `${delay ? delay : 0}`,
        "data-aos-easing": easing ? `${easing}` : "custom",
        "data-aos-duration": "600",
      });
    });
  };
  return single ? (
    renderChildren()
  ) : (
    <span
      data-aos-visibility={visible ? "" : "hidden"}
      style={{
        ...customStyle,
      }}
      {...props}
    >
      {renderChildren()}
    </span>
  );
};
