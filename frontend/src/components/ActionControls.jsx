import CONTROL_TYPE from "../enums/controlType";
import Button from "./Button";
import Select from "./Select";

const ActionControls = ({ controls }) => {
  const renderControl = (control) => {
    switch (control.type) {
      case CONTROL_TYPE.BUTTON:
        return (
          <Button
            key={control.label}
            label={control.label}
            onClick={control.onClick}
            className={control.buttonClassName}
            status={control.status}
          />
        );
      case CONTROL_TYPE.SELECT:
        return (
          <Select
            key={control.label}
            options={control.options}
            selected={control.selected}
            onChange={(e) => control.onChange(e)}
            status={control.status}
          />
        );
    }
  };

  return <>{controls && controls.map((control) => renderControl(control))}</>;
};

export default ActionControls;
