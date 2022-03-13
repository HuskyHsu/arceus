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
      let isAlola = false;
      if (tr[3].endsWith("洗翠的樣子")) {
        tr[3] = tr[3].replace("\n洗翠的樣子", "");
        isHisui = true;
      } else if (tr[3].endsWith("阿羅拉的樣子")) {
        tr[3] = tr[3].replace("\n阿羅拉的樣子", "");
        isAlola = true;
      }

      tr.splice(2, 1);
      const types = [tr[3]];
      if (tr[4] != "") {
        types.push(tr[4]);
      }

      const data = {
        id: tr[0],
        pid: tr[1],
        name: tr[2],
        types: types,
      };

      if (isHisui) {
        data.regional = "洗翠";
      } else if (isAlola) {
        data.regional = "阿羅拉";
      }
      return data;
    })
);

[...document.querySelectorAll("#mw-content-text th a img")].map(
  (img) => img.getAttribute("srcset").split(", ")[1].split(" ")[0]
);
