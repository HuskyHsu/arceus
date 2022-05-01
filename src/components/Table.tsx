import { Fragment, useState } from "react";
import clsx from "clsx";

interface Feild {
  name: string;
  value: Function;
  width?: string;
  colSpan?: number;
  details?: Function;
}

interface Props<T> {
  feilds: Feild[];
  data: T[];
}

export function Table<T>({ feilds, data }: Props<T>) {
  const hasToggle = feilds.find((feild) => feild.details !== undefined);
  return (
    <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
      <thead>
        <tr>
          {feilds.map((feild, i) => (
            <th
              key={i}
              className={clsx(
                "px-2 py-1",
                "title-font tracking-wider whitespace-nowrap text-gray-100 bg-sky-900",
                feild.width ? feild.width : ""
              )}
            >
              {feild.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!hasToggle &&
          data.map((item, i) => {
            return (
              <tr key={i} className="border-b-2 border-gray-200">
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
            const [toggle, setToggle] = useState(false);

            return (
              <Fragment key={i}>
                <tr
                  className="border-b-2 border-gray-200"
                  onClick={() => {
                    setToggle((toggle) => !toggle);
                  }}
                >
                  {feilds.map((feild, j) => (
                    <td key={j} className="px-2 py-1">
                      {feild.value(item)}
                    </td>
                  ))}
                </tr>
                {toggle && (
                  <tr
                    className={clsx("border-b-2 border-gray-200 bg-slate-200")}
                  >
                    {feilds.map((feild, k) => {
                      if (feild.details) {
                        return (
                          <td
                            key={data.length * feilds.length + k}
                            className="px-2 py-1"
                            colSpan={feild.colSpan ?? 1}
                          >
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
