import activeNotesTable from "./views/activeNotes.js";
import statisticTable from "./views/statisticTable.js";
import model from "./model.js";
import archiveTable from "./views/archiveNotes.js";
const root = document.getElementById("root");

activeNotesTable.render();
statisticTable.render(model.getStats());
archiveTable.render();

document.getElementById("openArchive").addEventListener("click", () => {
  document.getElementById("archiveContainer").classList.remove("left-full");
  root.classList.toggle("right-full");
  root.classList.toggle("absolute");
});
document.getElementById("closeArchive").addEventListener("click", () => {
  document.getElementById("archiveContainer").classList.toggle("left-full");
  root.classList.remove("right-full");
  root.classList.remove("absolute");
});

// document.addEventListener("click", (e) => {
//   console.log(e.target);
// });
