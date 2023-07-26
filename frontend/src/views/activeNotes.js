import {
  activeTableTopButtons,
  categories,
  controlButtonsActive,
  maxContentLength,
} from "../utils/constants.js";

class activeNotesTable {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    document.getElementById("root").innerHTML += `
    <div class="w-fit mx-auto">
    <button class="bg-gray-300 py-2 px-6 rounded" id="createNote">Create</button>
    <button class="bg-gray-300 py-2 px-6 rounded" id="openArchive">Archive</button>
</div>
    <table class="mx-auto mb-16 table-auto border-separate border-spacing-y-3" id="activeNotesTable">
      <thead class="h-14 bg-gray-300">
        <tr class="rounded-md">
          <th scope="col" class="w-16 rounded-l-md"></th>
          <th scope="col" class="w-32 text-left">Name</th>
          <th scope="col" class="w-24 text-left">Created</th>
          <th scope="col" class="w-24 text-left">Category</th>
          <th scope="col" class="w-64 text-left">Content</th>
          <th scope="col" class="w-56 text-left">Dates</th>
          <th scope="col" class="w-40 text-right pr-1 rounded-r-md">
          ${activeTableTopButtons}
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

        `;
    this.notesTableBody = document
      .getElementById("activeNotesTable")
      .getElementsByTagName("tbody")[0];
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
              let content;
              if (note.content.length > 35)
                content = `${note.content.substring(0, maxContentLength)}...`;
              else content = note.content;
              return (
                notesTableHtml +
                `
            <tr class="h-16 bg-blue-200 " data-id="${note.id}">
                <th class="rounded-l-md"><div class="w-12 h-12 m-auto rounded-full bg-gray-300">${
                  categories[note.category]
                }</div></th>
                <td>${note.name}</td>
                <td>${date}</td>
                <td>${note.category}</td>
                <td>${content}</td>
                <td>${note.dates}</td>
                <td class="text-right pr-1 rounded-r-md">${controlButtonsActive}</td>
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
