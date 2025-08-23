import { recursiveSnakeToCamel } from "../utils/snakeToCamelCase";
import errorToMessage from "./errorToMessage";

const fetchDefault = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = errorToMessage(error);

    throw new Error(errorMessage);
  }

  if (options.method === "DELETE") {
    return;
  }

  const result = await response.json();

  return recursiveSnakeToCamel(result);
};

export default fetchDefault;
