import { Fragment, useState } from "react";
import clsx from "clsx";

interface Feild {
  name: string | JSX.Element;
  value: Function;
  width?: string;
  colSpan?: number;
  details?: Function;
}

interface Props<T> {
  feilds: Feild[];
  data: T[];
  selectIndex?: Number;
  clickFn?: Function;
}

export function Table<T>({ feilds, data, selectIndex, clickFn }: Props<T>) {
  const hasToggle = feilds.find((feild) => feild.details !== undefined);
  const [toggles, setToggles] = useState(data.map((_) => false));

  return (
    <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
      <thead className="sticky top-0">
        <tr>
          {feilds.map((feild, i) => (
            <th
              key={i}
              className={clsx(
                "px-2 py-1",
                "title-font tracking-wider whitespace-nowrap text-gray-100 bg-sky-900",
                feild.width ? feild.width : ""
              )}>
              {feild.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!hasToggle &&
          data.map((item, i) => {
            return (
              <tr
                key={i}
                className={clsx("border-b-2 border-gray-200", {
                  "bg-yellow-200": selectIndex === i,
                })}
                onClick={() => {
                  if (clickFn) clickFn(i);
                }}>
                {feilds.map((feild, j) => (
                  <td key={j} className="px-2 py-1">
                    {feild.value(item)}
                  </td>
                ))}
              </tr>
            );
          })}
        {hasToggle &&
          data.map((item, i) => {
            return (
              <Fragment key={i}>
                <tr
                  className={clsx("border-b-2 border-gray-200", {
                    "bg-yellow-200": selectIndex === i,
                  })}
                  onClick={() => {
                    setToggles((toggles) => {
                      return toggles.map((toggle, j) => {
                        return i === j ? !toggle : toggle;
                      });
                    });
                    if (clickFn) clickFn(i);
                  }}>
                  {feilds.map((feild, j) => (
                    <td key={j} className="px-2 py-1">
                      {feild.value(item)}
                    </td>
                  ))}
                </tr>
                {toggles[i] && (
                  <tr
                    className={clsx("border-b-2 border-gray-200 bg-slate-200")}>
                    {feilds.map((feild, k) => {
                      if (feild.details) {
                        return (
                          <td
                            key={data.length * feilds.length + k}
                            className="px-2 py-1"
                            colSpan={feild.colSpan ?? 1}>
                            {feild.details(item)}
                          </td>
                        );
                      }
                    })}
                  </tr>
                )}
              </Fragment>
            );
          })}
      </tbody>
    </table>
  );
}
