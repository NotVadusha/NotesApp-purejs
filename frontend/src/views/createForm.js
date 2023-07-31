import { categories } from "../utils/constants.js";

export default class Form {
  constructor() {
    this.options = "";
    Object.keys(categories).forEach((category) => {
      this.options += `
                    <option>${category}</option>
                `;
    });
    this.formHtml = `
                <div class="modal fade" id="formModal" tabindex="-1">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Create new note</h1>
                            </div>
                            <div class="modal-body">
                                <form>
                                      <div class="mb-3">
                                        <label for="nameInput" class="form-label">Note name</label>
                                        <input type="text" class="form-control" id="nameInput">
                                      </div>
                                      <div class="mb-3">
                                        <label for="categorySelect" class="form-label">Category</label>                                      
                                        <select class="form-select" name="categorySelect" id="categorySelect">${this.options}</select>
                                      </div>
                                      <div class="mb-3 form-check">
                                        <label for="noteContentArea" class="form-label">Note content</label>
                                        <textarea class="form-control" id="noteContentArea"></textarea>
                                      </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="cancelButton">Cancel</button>
                                <button type="button" class="btn btn-primary" id="createButton">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    document.body.innerHTML += this.formHtml;
  }
}
