import { Pokemon } from "@/models";

interface Props {
  pokemon: Pokemon;
}

export function Items({ pokemon }: Props) {
  return (
    <>
      <h2 className="mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg">
        攜帶道具
      </h2>
      <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              來源
            </th>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              道具名稱
            </th>
            <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              機率(%)
            </th>
          </tr>
        </thead>
        <tbody>
          {pokemon.items.map((item, i) => (
            <tr key={i}>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {item.boss ? "頭目" : "一般"}
              </td>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {item.name}
              </td>
              <td className="border-t-2 border-gray-200 px-2 py-1">
                {item["%"]}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
