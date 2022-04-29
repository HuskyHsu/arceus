import clsx from "clsx";

interface Props {
  tabs: string[];
  action: string;
  taggleTab: Function;
}

interface TabProp {
  text: string;
  action: boolean;
  taggleTab: Function;
}

function Tab({ text, action, taggleTab }: TabProp) {
  return (
    <button
      className={clsx(
        "flex items-center h-12 px-4 py-2 rounded-t-md",
        "border border-b-0 border-white",
        "text-sm text-center text-gray-700 sm:text-base",
        "whitespace-nowrap focus:ring-none",
        action ? "bg-white" : "bg-transparent"
      )}
      onClick={() => taggleTab(text)}>
      {text}
    </button>
  );
}

export function Tabs({ tabs, action, taggleTab }: Props) {
  return (
    <div className="flex gap-1">
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab}
            text={tab}
            action={action === tab}
            taggleTab={taggleTab}
          />
        );
      })}
    </div>
  );
}
