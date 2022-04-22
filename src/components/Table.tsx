interface Feild {
  name: string;
  value: Function;
}

interface Props<T> {
  feilds: Feild[];
  data: T[];
}

export function Table<T>({ feilds, data }: Props<T>) {
  return (
    <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
      <thead>
        <tr>
          {feilds.map((feild, i) => (
            <th
              key={i}
              className="px-2 py-1 title-font tracking-wider whitespace-nowrap text-gray-900 bg-gray-100"
            >
              {feild.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            {feilds.map((feild, j) => (
              <td key={j} className="border-t-2 border-gray-200 px-2 py-1">
                {feild.value(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
