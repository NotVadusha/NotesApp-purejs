import model from "./model.js";
import Notes from "./views/activeNotes.js";
import Form from "./views/createForm.js";
import Archive from "./views/archiveNotes.js";
import Statistic from "./views/statisticTable.js";
import Editor from "./views/editForm.js";
import Warning from "./views/warningModals.js";
import { categories } from "./utils/constants.js";

if (!localStorage.getItem("notes")) {
  localStorage.setItem("notes", JSON.stringify([]));
}
const statsTable = new Statistic();
const form = new Form();
const archive = new Archive();
const edit = new Editor();
const warning = new Warning();

const renderUI = () => {
  Notes.render();
  statsTable.renderStats(model.getStats());
  archive.render();
};
renderUI();

const formModal = new bootstrap.Modal(document.getElementById("formModal"), {
  backdrop: "static",
});

document.getElementById("cancelButton").addEventListener("click", () => {
  formModal.hide();
});

document.getElementById("createNote").addEventListener("click", () => {
  formModal.show();
});

document.getElementById("createButton").addEventListener("click", () => {
  const nameInput = document.getElementById("nameInput");
  const categorySelect = document.getElementById("categorySelect");
  const content = document.getElementById("noteContentArea");
  const noteInfo = {
    name: nameInput.value,
    category: categorySelect.value,
    content: content.value,
  };
  formModal.hide();
  try {
    model.saveNote(noteInfo);
  } catch (err) {
    warning.renderWarning("Error", err);
  }
  nameInput.value = "";
  categorySelect.value = Object.keys(categories)[0];
  content.value = "";
  renderUI();
});

document.getElementById("archiveAll").addEventListener("click", () => {
  warning.renderConfirmation("Archive ALL notes", () => {
    model.changeStateAll("archived");
    renderUI();
  });
});

document.getElementById("deleteAll").addEventListener("click", () => {
  warning.renderConfirmation("DELETE ALL ACTIVE NOTES", () => {
    model.deleteAll("active");
    renderUI();
  });
});

document.getElementById("unArchiveAll").addEventListener("click", () => {
  warning.renderConfirmation("UnArchive ALL notes", () => {
    model.changeStateAll("active");
    renderUI();
  });
});

document.getElementById("archiveDeleteAll").addEventListener("click", () => {
  warning.renderConfirmation("DELETE ALL ARCHIVED NOTES", () => {
    model.deleteAll("archived");
    renderUI();
  });
});

let id;

document.body.addEventListener("click", (event) => {
  // Editing
  if (event.target.matches(".brush")) {
    id = event.target.parentNode.parentNode.getAttribute("data-id");
    try {
      edit.render(id);
    } catch (err) {
      warning.renderWarning("Error", err);
    }
  } else if (event.target.matches(".bi-brush")) {
    id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    try {
      edit.render(id);
    } catch (err) {
      warning.renderWarning("Error", err);
    }
  }

  if (event.target.matches("#editChangeButton")) {
    const editedInfo = {
      name: document.getElementById("nameEdit").value,
      category: document.getElementById("categoryEdit").value,
      content: document.getElementById("noteContentAreaEdit").value,
    };
    try {
      model.editNote(id, editedInfo);
    } catch (err) {
      warning.renderWarning("Error", err);
    }
    renderUI();
  }

  // Deleting
  if (event.target.matches(".bucket")) {
    model.deleteNote(
      event.target.parentNode.parentNode.getAttribute("data-id")
    );
    Notes.render();
    archive.render();
    statsTable.renderStats(model.getStats());
  } else if (event.target.matches(".bi-bucket")) {
    model.deleteNote(
      event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
    );
    renderUI();
  }
});

document.body.addEventListener("click", (e) => {
  const tableType = e.target.parentNode.parentNode.parentNode.parentNode;
  if (tableType.id === "activeNotesTable") {
    model.archiveNote(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    renderUI();
  } else if (tableType.parentNode.id === "activeNotesTable") {
    model.archiveNote(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    renderUI();
  }
});
document.body.addEventListener("click", (e) => {
  const tableType = e.target.parentNode.parentNode.parentNode;
  if (tableType.id === "archiveTableBody") {
    model.unArchiveNote(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    renderUI();
  } else if (tableType.parentNode.id === "archiveTableBody") {
    model.unArchiveNote(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    renderUI();
  }
});
