import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "./toastSlice";
import { TOAST_DISPLAY_DURATION } from "../../constants/time";
import { errorToMessage } from "../../utils/handleError";

const Toast = () => {
  const { message, type } = useSelector((state) => state.toast);

  const dispatch = useDispatch();

  let color;
  let messageToDisplay;

  switch (type) {
    case "error":
      color = "bg-red-500 text-white";
      messageToDisplay = errorToMessage(message);
      break;
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, TOAST_DISPLAY_DURATION);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`${color} fixed bottom-4 right-4 p-4 rounded-md`}>
      {messageToDisplay}
    </div>
  );
};

export default Toast;
