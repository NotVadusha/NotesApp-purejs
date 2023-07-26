import { categories } from "../utils/constants.js";

class statisticTable {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    document.getElementById("root").innerHTML += `
    <table class="mx-auto my-16 table-auto border-separate border-spacing-y-3" id="statisticTable">
    <thead class="h-14 bg-gray-300">
    <tr class="rounded-md">
        <th scope="col" class="w-16 rounded-l-md"></th>
        <th scope="col" class="w-32 text-left">Category</th>
        <th scope="col" class="w-32 text-center">Active</th>
        <th scope="col" class="w-32 text-center rounded-r-md">Archived</th>
    </tr>
    </thead>
    <tbody></tbody>
</table>
    `;
    this.statsTableBody = document
      .getElementById("statisticTable")
      .getElementsByTagName("tbody")[0];
    this.statsTableHtml = ``;
  }

  render(stats) {
    this.statsTableHtml = ``;
    this.statsTableBody = document
      .getElementById("statisticTable")
      .getElementsByTagName("tbody")[0];

    this.statsTableBody.innerHTML = Object.keys(categories).reduce(
      (statsHtml, category) => {
        return (
          statsHtml +
          `
                <tr class="table-secondary">
                    <th>${categories[category]}</th>
                    <td class="text-left">${category}</td>
                    <td class="text-center">${stats[category].active}</td>
                    <td class="text-center">${stats[category].archived}</td>
                </tr>
                    `
        );
      },
      ""
    );
  }
}

export default new statisticTable();
