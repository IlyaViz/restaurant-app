export const errorToMessage = (error) => {
  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object") {
    if (error.message) {
      return error.message;
    }

    return Object.values(error).join(", ");
  }
};
