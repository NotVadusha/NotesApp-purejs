import { categories } from "../utils/constants.js";

class editForm {
  constructor() {
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    this.options = "";
    Object.keys(categories).forEach((category) => {
      this.options += `<option>${category}</option>`;
    });
    document.getElementById("root").innerHTML += `
        <div class="absolute inset-0 hidden" id="editor">
            <div class="mx-auto my-4 w-fit h-max p-12 rounded bg-gray-100 shadow-md shadow-gray-600">
                <form>
                    <input class="form-input w-48 rounded" id="nameInput" placeholder="Enter note name">
                    <select class="form-select rounded" id="categoriesSelect">${this.options}</select>
                    <br>
                    <textarea class="form-textarea my-4 w-full h-24 max-h-80 rounded bg-slate-200 border border-black" id="contentInput" placeholder="Enter note content"></textarea>
                </form>
                <div class="w-fit mx-auto mt-8">
                    <button class="py-2 px-6 bg-gray-400 rounded" id="submit">Submit</button>
                    <button class="py-2 px-6 bg-gray-400 rounded" id="closeForm">Close</button>
                </div>
            </div>
        </div>
    `;

    this.nameInput = document.getElementById("nameInput");
    this.categorySelector = document.getElementById("categoriesSelect");
    this.contentInput = document.getElementById("contentInput");
  }
  renderEdit(noteId, action) {
    document.getElementById("editor").classList.remove("hidden");
    this.notesList = JSON.parse(localStorage.getItem("notes"));
    const selectedNote = this.notesList.filter((note) => noteId === note.id)[0];
    this.nameInput.value = selectedNote.name;
    this.categorySelector.value = selectedNote.category;
    this.contentInput.value = selectedNote.content;
    const submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", () => {
      if (!this.nameInput.value) {
        this.nameInput.classList.add("border-red-400");
      } else {
        const noteInfo = {
          name: this.nameInput.value,
          category: this.categorySelector.value,
          content: this.contentInput.value,
        };
        action(noteId, noteInfo);
        document.getElementById("editor").classList.add("hidden");
        document
          .getElementById("submit")
          .removeEventListener("click", () => {});
        submitBtn.replaceWith(submitBtn.cloneNode(true));
      }
    });
  }
  renderCreate(action) {
    document.getElementById("editor").classList.remove("hidden");
    this.nameInput.value = "";
    this.categorySelector.value = Object.keys(categories)[0];
    this.contentInput.value = "";
    const submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", () => {
      if (!this.nameInput.value) {
        this.nameInput.classList.add("border-red-400");
      } else {
        const noteInfo = {
          name: this.nameInput.value,
          category: this.categorySelector.value,
          content: this.contentInput.value,
        };
        action(noteInfo);
        document.getElementById("editor").classList.add("hidden");
        submitBtn.replaceWith(submitBtn.cloneNode(true));
      }
    });
  }
}

export default new editForm();
