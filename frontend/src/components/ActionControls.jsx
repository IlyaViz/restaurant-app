import CONTROL_TYPE from "../enums/controlType";
import Button from "./Button";
import Select from "./Select";

const ActionControls = ({ controls }) => {
  const renderControl = (control) => {
    switch (control.type) {
      case CONTROL_TYPE.BUTTON:
        return <Button key={control.label} {...control} />;
      case CONTROL_TYPE.SELECT:
        return <Select key={control.label} {...control} />;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {controls && controls.map((control) => renderControl(control))}
    </div>
  );
};

export default ActionControls;
