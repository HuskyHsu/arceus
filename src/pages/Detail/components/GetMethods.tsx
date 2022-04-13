import { Pokemon } from "../Detail";

interface Props {
  pokemon: Pokemon;
}

export function GetMethods({ pokemon }: Props) {
  return (
    <>
      <h2 className="mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg">
        獲得方式
      </h2>
      <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              地點
            </th>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              方式
            </th>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              條件
            </th>
          </tr>
        </thead>
        <tbody>
          {pokemon.getMethods.map((get, i) => (
            <tr key={i}>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {get.location &&
                  (typeof get.location === "string"
                    ? get.location
                    : Object.entries(get.location as object).map(
                        ([key, value]) => {
                          return (
                            <p key={key}>{`${key}：${value.join(",")}`}</p>
                          );
                        }
                      ))}
              </td>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {get.mode}
              </td>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {get.remark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
