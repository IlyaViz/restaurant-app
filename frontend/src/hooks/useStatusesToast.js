import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import TOAST_TYPE from "../enums/toastType";

const useStatusesToast = (statuses) => {
  const dispatch = useDispatch();

  useEffect(() => {
    statuses.forEach((status) => {
      if (status?.error) {
        dispatch(
          showToast({
            type: TOAST_TYPE.ERROR,
            message: status.error,
          })
        );
      }
    });
  }, [statuses, dispatch]);
};

export default useStatusesToast;
