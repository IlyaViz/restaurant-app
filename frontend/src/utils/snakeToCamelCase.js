export const snakeToCamelCase = (string) => {
  return string
    .split("_")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

export const snakeObjectToCamelCase = (obj) => {
  const newObj = {};

  for (const key in obj) {
    newObj[snakeToCamelCase(key)] = obj[key];
  }

  return newObj;
};

export const recursiveSnakeToCamel = (data) => {
  if (Array.isArray(data)) {
    return data.map(recursiveSnakeToCamel);
  } else if (data !== null && typeof data === "object") {
    const converted = snakeObjectToCamelCase(data);

    for (const key in converted) {
      converted[key] = recursiveSnakeToCamel(converted[key]);
    }

    return converted;
  }
  return data;
};
