import { useState } from "react";
import Button from "./Button";

const SectionSwitcher = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="flex flex-col gap-4 items-center text-center">
      <div className="flex flex-col">
        {sections.map((section, index) => (
          <Button
            key={index}
            label={section.title}
            onClick={() => setActiveSection(index)}
            className="btn-primary"
            active={!(activeSection === index)}
          />
        ))}
      </div>

      {sections[activeSection].component}
    </div>
  );
};

export default SectionSwitcher;
