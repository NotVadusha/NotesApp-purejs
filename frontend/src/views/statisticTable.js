import { categories } from "../utils/constants.js";

export default class Statistic {
  constructor() {
    document.getElementById("root").innerHTML += `    
    <table class="table table-primary text-center container" id="note-stat">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" class="text-start">Note category</th>
          <th scope="col">Active</th>
          <th scope="col">Archived</th>
        </tr>
      </thead>

      <tbody></tbody>
    </table>`;
  }

  renderStats(stats) {
    this.statsHtml = "";
    this.statsTableBody = document
      .getElementById("note-stat")
      .getElementsByTagName("tbody")[0];

    this.statsTableBody.innerHTML = Object.keys(categories).reduce(
      (statsHtml, category) => {
        return (
          statsHtml +
          `
            <tr class="table-secondary">
                <th>${categories[category]}</th>
                <td class="text-start">${category}</td>
                <td>${stats[category].active}</td>
                <td>${stats[category].archived}</td>
            </tr>
          `
        );
      },
      ""
    );
  }
}
