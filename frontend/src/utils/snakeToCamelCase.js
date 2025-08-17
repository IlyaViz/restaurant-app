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