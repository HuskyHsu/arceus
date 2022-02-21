JSON.stringify(
  [...document.querySelectorAll("table")]
    .map((table) => {
      return [...table.querySelectorAll("tr")];
    })
    .flat()
    .map((tr) => {
      return [...tr.querySelectorAll("td")].map((td) => td.innerText);
    })
    .filter((tr) => tr.length === 6)
    .filter((tr) => tr[0].startsWith("#"))
    .map((tr) => {
      if (tr[5].startsWith("[[")) {
        tr[5] = "";
      }

      let isHisui = false;

      if (tr[3].endsWith("洗翠的樣子")) {
        tr[3] = tr[3].replace("\\n洗翠的樣子", "");
        isHisui = true;
      }

      tr.splice(2, 1);
      const types = [tr[3]];
      if (tr[4] != "") {
        types.push(tr[4]);
      }

      return {
        id: tr[0],
        pid: tr[1],
        name: tr[2],
        types: types,
        isHisui,
      };
    })
);
