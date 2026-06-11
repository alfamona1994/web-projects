"use client";

import { useContextApp } from "@/app/contextApp";

const Tabs = () => {
  const {
    tabsOptionsObject: { tabsOptions, setTabsOptions },
  } = useContextApp();

  const handleTabClick = (index: number) => {
    const updatedTabs = tabsOptions.map((tab, i) => ({
      ...tab,
      isSelected: i === index,
    }));
    setTabsOptions(updatedTabs);
  };

  return (
    <div className="flex gap-4 border-b">
      {tabsOptions.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(index)}
          className={`pb-2 px-2 font-medium text-sm transition-colors ${
            tab.isSelected
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
