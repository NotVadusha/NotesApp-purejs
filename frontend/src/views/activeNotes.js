import {
  categories,
  controlIcons,
  maxContentLength,
} from "../utils/constants.js";

class activeNotesTable {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    document.getElementById("root").innerHTML += `
      <div class="container mt-5">
        <button type="button" class="btn btn-secondary" id="createNote">Create</button>
        <button type="button" class="btn btn-secondary" id="openArchive">Archive</button>
      </div>
      <div class="overflow-y-scroll container" style="max-height: 75vh">
        <table class="overflow-y-scroll table table-primary table-hover table-borderless mt-5" id="activeNotesTable">
          <thead>
            <tr>
                <th scope="col" class="col-1"></th>
                <th scope="col" class="align-middle col-2">Name</th>
                <th scope="col" class="align-middle col-1">Created</th>
                <th scope="col" class="align-middle col-1">Category</th>
                <th scope="col" class="align-middle col-3">Content</th>
                <th scope="col" class="align-middle col-2">Dates</th>
                <th scope="col" class="text-end align-middle col-4">
                  <button class="btn btn-outline-primary" id="archiveAll"><i class="bi bi-archive"></i></button>
                  <button class="btn btn-outline-primary" id="deleteAll"><i class="bi bi-bucket"></i></button>
                </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
        `;

    this.notesTableHtml = ``;
  }
  render() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    this.notesTableBody = document
      .getElementById("activeNotesTable")
      .getElementsByTagName("tbody")[0];
    this.notesTableBody.innerHTML =
      this.notesList.length !== 0
        ? this.notesList.reduce((notesTableHtml, note) => {
            if (note.state === "active") {
              const date = new Date(note.createDate).toLocaleDateString(
                "en-GB"
              );
              return (
                notesTableHtml +
                `
                  <tr class="table-secondary" data-id="${note.id}">
                    <th class="text-center">${categories[note.category]}</th>
                    <td>${
                      note.name.lenght > 20
                        ? note.name.substring(0, 20)
                        : note.name
                    }</td>
                    <td>${date}</td>
                    <td>${note.category}</td>
                    <td>${
                      note.content.lenght > maxContentLength
                        ? note.content.substring(0, maxContentLength) + "..."
                        : note.content
                    }</td>
                    <td>${
                      note.dates.lenght < 20
                        ? note.dates.substring(0, 20)
                        : note.dates
                    }</td>
                    <td class="text-end">${controlIcons}</td>
                  </tr>
                `
              );
            }
            return notesTableHtml + "";
          }, "")
        : "";
  }
}

export default new activeNotesTable();
