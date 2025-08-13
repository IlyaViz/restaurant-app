import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/toast/toastSlice";
import TOAST_TYPE from "../enums/toastType";

const useStatusesToast = (statuses) => {
  const prevStatusesRef = useRef(statuses);

  const dispatch = useDispatch();

  useEffect(() => {
    statuses.forEach((status, index) => {
      if (status?.error && prevStatusesRef.current[index]?.loading) {
        dispatch(
          showToast({
            type: TOAST_TYPE.ERROR,
            message: status.error,
          })
        );
      }
    });

    prevStatusesRef.current = statuses;
  }, [statuses, dispatch]);
};

export default useStatusesToast;
