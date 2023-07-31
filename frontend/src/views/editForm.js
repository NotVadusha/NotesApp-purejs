import { categories } from "../utils/constants.js";

export default class Editor {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    this.options = "";
    Object.keys(categories).forEach((category) => {
      this.options += `
                    <option>${category}</option>
                `;
    });
    this.formHtml = `
                <div class="modal fade" id="editModal" tabindex="-1">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Edit note</h1>
                            </div>
                            <div class="modal-body">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="editCancelButton">Cancel</button>
                                <button type="button" class="btn btn-primary" id="editChangeButton">Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    document.body.innerHTML += this.formHtml;
  }

  render(noteId) {
    if (!noteId) throw new Error("It is not note! (can't find id)");

    this.notesList = JSON.parse(localStorage.getItem("notes"));
    const modal = document
      .getElementById("editModal")
      .getElementsByClassName("modal-body")[0];
    const selectedNote = this.notesList.filter((note) => noteId === note.id)[0];

    modal.innerHTML = `
            <form>
                <div class="mb-3">
                    <label for="nameInput" class="form-label">Note name</label>
                    <input type="text" class="form-control" id="nameEdit" value="${selectedNote.name}">
                </div>
                <div class="mb-3">
                    <label for="categorySelect" class="form-label">Category</label>
                    <select class="form-select" name="categorySelect" id="categoryEdit">${this.options}</select>
                </div>
                <div class="mb-3 form-check">
                    <label for="noteContentArea" class="form-label">Note content</label>
                    <textarea class="form-control" id="noteContentAreaEdit">${selectedNote.content}</textarea>
                </div>
            </form>
      
        `;
    document.getElementById("categoryEdit").value = selectedNote.category;
    const editModal = new bootstrap.Modal(
      document.getElementById("editModal"),
      { backdrop: "static" }
    );
    editModal.show();
    document
      .getElementById("editCancelButton")
      .addEventListener("click", () => {
        editModal.hide();
      });
    document
      .getElementById("editChangeButton")
      .addEventListener("click", () => {
        editModal.hide();
      });
  }
}
