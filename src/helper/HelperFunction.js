export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};
export const thousandToK = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num < 900) {
    return num;
  }
};

export const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

//TODO:
export const interpolateString = (str, valueObj) => {
  if (typeof str !== "string") {
    return "";
  }
  for (let key in valueObj) {
    return str.replace(`{${key}}`, valueObj[key]);
  }
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const ReturnFormatedNumber = (number) => {
  let newNumber = number?.slice(2);
  newNumber = newNumber?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) - $2 $3");
  return newNumber;
};

export const falsyArray = [
  null,
  undefined,
  "",
  0,
  false,
  NaN,
  "null",
  "undefined",
  "false",
  "0",
  "NaN",
];
