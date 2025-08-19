import { useState } from "react";
import Button from "./Button";

const SectionSwitcher = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="flex flex-col items-center text-center">
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

      <div>
        <h1 className="text-2xl font-bold mt-8">
          {sections[activeSection].title}
        </h1>

        {sections[activeSection].component}
      </div>
    </div>
  );
};

export default SectionSwitcher;
