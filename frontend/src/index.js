import model from "./model.js";
import activeNotesTable from "./views/activeNotes.js";
import statisticTable from "./views/statisticTable.js";
import archiveTable from "./views/archiveNotes.js";
import notesForm from "./views/editForm.js";
const root = document.getElementById("root");

activeNotesTable.render();
statisticTable.render(model.getStats());
archiveTable.render();

document.getElementById("openArchive").addEventListener("click", () => {
  document.getElementById("archiveContainer").classList.remove("hidden");
  root.classList.add("hidden");
});
document.getElementById("closeArchive").addEventListener("click", () => {
  document.getElementById("archiveContainer").classList.add("hidden");
  root.classList.toggle("hidden");
});
document.getElementById("closeForm").addEventListener("click", () => {
  document.getElementById("editor").classList.add("hidden");
  document.body.classList.remove("overflow-y-hidden");
});
document.getElementById("createNote").addEventListener("click", () => {
  try {
    notesForm.renderCreate((noteInfo) => {
      model.saveNote(noteInfo);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    });
  } catch (e) {
    console.log(e);
  }
});

document.getElementById("unArchiveAll").addEventListener("click", () => {
  model.changeStateAll("active");
  activeNotesTable.render();
  statisticTable.render(model.getStats());
  archiveTable.render();
});
document.getElementById("archiveAll").addEventListener("click", () => {
  model.changeStateAll("archived");
  activeNotesTable.render();
  statisticTable.render(model.getStats());
  archiveTable.render();
});
document.getElementById("deleteAllActive").addEventListener("click", () => {
  model.deleteAll("active");
  activeNotesTable.render();
  statisticTable.render(model.getStats());
  archiveTable.render();
});
document.getElementById("deleteAllArchived").addEventListener("click", () => {
  model.deleteAll("archived");
  activeNotesTable.render();
  statisticTable.render(model.getStats());
  archiveTable.render();
});
// Bind edit buttons
document.body.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.matches(".editNote")) {
    const id = e.target.parentNode.parentNode.getAttribute("data-id");
    try {
      notesForm.renderEdit(id, (id, noteInfo) => {
        model.editNote(id, noteInfo);
        activeNotesTable.render();
        statisticTable.render(model.getStats());
        archiveTable.render();
      });
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.parentNode?.matches(".editNote")) {
    const id =
      e.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    try {
      notesForm.renderEdit(id, (id, noteInfo) => {
        model.editNote(id, noteInfo);
        activeNotesTable.render();
        statisticTable.render(model.getStats());
        archiveTable.render();
      });
    } catch (e) {
      console.log(e);
    }
  }
  //  Bind archive note buttons
  if (e.target.matches(".archiveNote")) {
    const id = e.target.parentNode.parentNode.getAttribute("data-id");
    try {
      model.archiveNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.parentNode?.matches(".archiveNote")) {
    const id =
      e.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    try {
      model.archiveNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  }
  //  Bind unarchive note buttons

  if (e.target.matches(".unArchiveNote")) {
    const id = e.target.parentNode.parentNode.getAttribute("data-id");
    try {
      model.unArchiveNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.parentNode?.matches(".unArchiveNote")) {
    const id =
      e.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    try {
      model.unArchiveNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  }
  //  Bind delete note buttons

  if (e.target.matches(".deleteNote")) {
    const id = e.target.parentNode.parentNode.getAttribute("data-id");
    try {
      model.deleteNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.parentNode?.matches(".deleteNote")) {
    const id =
      e.target.parentNode.parentNode.parentNode.getAttribute("data-id");
    try {
      model.deleteNote(id);
      activeNotesTable.render();
      statisticTable.render(model.getStats());
      archiveTable.render();
    } catch (e) {
      console.log(e);
    }
  }
  if (e.target.matches("#editor"))
    document.getElementById("editor").classList.add("hidden");
});
