import { categories } from "./utils/constants.js";
import { notes } from "./utils/notes.js";

class Model {
  constructor() {
    this.notesList = notes || [];
    localStorage.setItem("notes", JSON.stringify(this.notesList));
  }

  saveNote(noteInfo) {
    if (noteInfo.name && noteInfo.category) {
      this.notesList = this.getNotes();
      const dates = this.parseNoteDate(noteInfo.content);
      const newNote = {
        id: `${self.crypto.randomUUID()}`,
        name: noteInfo.name,
        createDate: new Date(),
        category: noteInfo.category,
        content: noteInfo.content,
        dates: dates,
        state: "active",
      };
      this.notesList.push(newNote);
      this.setNotes(this.notesList);
    } else throw new Error("Not specified note name or category!");
  }

  deleteNote(noteId) {
    if (!noteId) throw new Error("There is no ID");
    this.notesList = this.getNotes();
    this.setNotes(this.notesList.filter((note) => note.id !== noteId));
  }

  deleteAll(state) {
    this.notesList = this.getNotes();
    this.notesList
      .filter((note) => note.state === state)
      .map((note) => this.deleteNote(note.id));
  }

  archiveNote(noteId) {
    if (!noteId) throw new Error("There is no ID");
    console.log(noteId);
    this.notesList = this.getNotes();
    this.notesList.forEach((note) => {
      if (note.id === noteId) {
        note.state = "archived";
      }
    });
    this.setNotes(this.notesList);
  }

  unArchiveNote(noteId) {
    if (!noteId) throw new Error("There is no ID");
    this.notesList = this.getNotes();
    this.notesList.forEach((note) => {
      if (note.id === noteId) {
        note.state = "active";
      }
    });
    this.setNotes(this.notesList);
  }

  changeStateAll(state) {
    this.notesList = this.getNotes();
    if (state === "archived") {
      this.notesList.map((note) => this.archiveNote(note.id));
    } else if (state === "active") {
      this.notesList.map((note) => this.unArchiveNote(note.id));
    }
  }

  editNote(noteId, newInfo) {
    if (!noteId) throw new Error("There is no ID");
    this.notesList = this.getNotes();
    if (newInfo.name && newInfo.category) {
      const dates = this.parseNoteDate(newInfo.content);
      this.notesList.forEach((note) => {
        if (note.id === noteId) {
          note.name = newInfo.name;
          note.category = newInfo.category;
          note.content = newInfo.content;
          note.dates = dates;
        }
      });
      this.setNotes(this.notesList);
    } else throw new Error("Not specified note name or category!");
  }

  getStats() {
    this.notesList = this.getNotes();
    const stats = {};
    Object.keys(categories).forEach((category) => {
      stats[category] = { active: 0, archived: 0 };
    });
    Object.keys(categories).forEach((category) => {
      this.notesList.forEach((note) => {
        if (note.category === category && note.state === "active") {
          stats[category].active++;
        } else if (note.category === category && note.state === "archived") {
          stats[category].archived++;
        }
      });
    });
    return stats;
  }

  parseNoteDate(noteContent) {
    const dates = [];
    if (noteContent.match(dateFormats)) {
      noteContent.match(dateFormats).forEach((date) => {
        let formattedDate = date.replaceAll("-", "/");
        formattedDate = date.replaceAll(".", "/");
        dates.push(formattedDate);
      });
    }
    return dates;
  }

  setNotes(notesArr) {
    if (notesArr === null) notesArr = [];
    localStorage.setItem("notes", JSON.stringify(notesArr));
  }

  getNotes() {
    return JSON.parse(localStorage.getItem("notes"));
  }
}

export default new Model();
