import { useState } from "react";
import Button from "./Button";

const SectionSwitcher = ({ sections }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center text-center">
      {sections.map((section, index) => (
        <Button
          key={index}
          label={section.title}
          onClick={() => setActiveTab(index)}
          className="btn-primary"
          active={activeTab === index}
        />
      ))}

      <div>
        <h2>{sections[activeTab].title}</h2>
        {sections[activeTab].component}
      </div>
    </div>
  );
};

export default SectionSwitcher;
