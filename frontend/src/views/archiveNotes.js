import {
  categories,
  controlIcons,
  maxContentLength,
} from "../utils/constants.js";

export default class Archive {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    this.archiveHtml = `
      <div class="modal fade" id="archiveModal" tabindex="-1">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5">Archive</h1>
            </div>
            <div class="modal-body">
              <table class="table table-primary table-hover table-borderless mt-5 container">
                <thead>
                  <tr>
                    <th scope="col" class="col-1"></th>
                    <th scope="col" class="align-middle col-2">Name</th>
                    <th scope="col" class="align-middle col-1">Created</th>
                    <th scope="col" class="align-middle col-1">Category</th>
                    <th scope="col" class="align-middle col-3">Content</th>
                    <th scope="col" class="align-middle col-2">Dates</th>
                    <th scope="col" class="text-end col-4">
                      <button class="btn btn-outline-primary" id="unArchiveAll">
                        <i class="bi bi-archive"></i>
                      </button>
                      <button class="btn btn-outline-primary" id="archiveDeleteAll">
                        <i class="bi bi-bucket"></i>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody id="archiveTableBody"></tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="closeArchive">Close</button>
            </div>
          </div>
        </div>
    </div>
    `;
    document.getElementsByTagName("body")[0].innerHTML += this.archiveHtml;
    this.archiveTableBody = document.getElementById("archiveTableBody");
  }

  render() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    this.archiveTableBody = document.getElementById("archiveTableBody");
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
                <tr class="table-secondary" data-id="${note.id}">
                    <th class="text-center">${categories[note.category]}</th>
                    <td>${
                      note.name.lenght > 20
                        ? note.name.substring(0, 20)
                        : note.name
                    }                    
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
          return archivedNotesRows + "";
        }, "")
      : "";
    const archiveModal = new bootstrap.Modal(
      document.getElementById("archiveModal"),
      { backdrop: "static" }
    );
    document.getElementById("closeArchive").addEventListener("click", () => {
      archiveModal.hide();
    });
    document.getElementById("openArchive").addEventListener("click", () => {
      archiveModal.show();
    });
  }
}
