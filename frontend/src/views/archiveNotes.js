import {
  categories,
  controlButtons,
  tableTopButtons,
} from "../utils/constants.js";
import { notes } from "../utils/notes.js";

class Archive {
  constructor() {
    this.notesList = notes || [];
    document.body.innerHTML += `
      <div class="container mx-auto my-4 absolute left-full inset-0 bottom-0" id="archiveContainer">
          <h1 class="text-3xl font-semibold text-center">Archive</h1>
          <div class="">
            <table class="mx-auto my-4 table-auto border-separate border-spacing-y-3" id="archiveTable">
              <thead class="h-14 bg-gray-300">
              <tr class="rounded-md">
                <th scope="col" class="w-16 rounded-l-md"></th>
                <th scope="col" class="w-32 text-left">Name</th>
                <th scope="col" class="w-24 text-left">Created</th>
                <th scope="col" class="w-24 text-left">Category</th>
                <th scope="col" class="w-64 text-left">Content</th>
                <th scope="col" class="w-56 text-left">Dates</th>
                <th scope="col" class="w-40 text-right pr-1 rounded-r-md">
                ${tableTopButtons}
                </th>
              </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div class="w-fit mx-auto">
              <button class="bg-gray-300 rounded text-xl font-semibold py-2 px-6" id="closeArchive">Close</button>
          </div>
      </div>
      `;
    this.archiveTableBody = document
      .getElementById("archiveTable")
      .getElementsByTagName("tbody")[0];
  }

  render() {
    this.notesList = notes || [];
    this.archiveTableBody = document
      .getElementById("archiveTable")
      .getElementsByTagName("tbody")[0];

    this.archiveTableBody.innerHTML = this.notesList
      ? this.notesList.reduce((archivedNotesRows, note) => {
          if (note.state === "archived") {
            const date = new Date(note.createDate).toLocaleDateString("en-GB");
            let content;
            if (note.content.length > 35)
              content = `${note.content.substring(0, maxContentLength)}...`;
            else content = note.content;
            return (
              archivedNotesRows +
              `
                <tr class="h-16 bg-blue-200" data-id="${note.id}">
                    <th class="rounded-l-md"><div class="w-12 h-12 m-auto rounded-full bg-gray-300">${
                      categories[note.category]
                    }</div></th>
                    <td>${note.name}</td>
                    <td>${date}</td>
                    <td>${note.category}</td>
                    <td>${content}</td>
                    <td>${note.dates}</td>
                    <td class="ext-right pr-1 rounded-r-md">${controlButtons}</td>
                </tr>
                    `
            );
          }
          return archivedNotesRows + "";
        }, "")
      : "";
  }
}

export default new Archive();
