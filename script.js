'use strict';

function init() {
  // Variables
  const noteList = [];
  let editingNoteId = null;
  let deletingNoteId = null;

  // DOM elements
  const addNoteBtn = document.getElementById('addNote');
  const addNoteBtnSecondary = document.getElementById('addNoteSecondary');
  const newNoteContainer = document.getElementById('newNoteContainer');
  const saveNoteBtn = document.getElementById('saveNote');
  const saveEditedNoteBtn = document.getElementById('saveEditedNote');
  const cancelBtn = document.getElementById('cancel');
  const inputName = document.getElementById('inputName');
  const inputText = document.getElementById('inputText');
  const inputSearch = document.getElementById('inputSearch');
  const emptyContainer = document.getElementById('emptyContainer');
  const notesContainer = document.getElementById('notesContainer');
  const modalDelete = document.getElementById('modal__delete');
  const deleteBtn = document.getElementById('delete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');

  // Functions

  function checkNotesLength() {
    if (!noteList.length) {
      addNoteBtn.classList.add('hidden');
      emptyContainer.classList.remove('hidden');
    } else {
      addNoteBtn.classList.remove('hidden');
      emptyContainer.classList.add('hidden');
    }
  }

  function renderNotes(list = noteList) {
    const notes = list.map((note) => {
      const date = new Date(note.date);
      const month = date.toLocaleString('default', { month: 'short' });
      return `<div class="note">
            <div class="note-content__container">
                <div class="note__title">${note.title}</div>
                <div class="note__text">${note.body}</div>
                <div class="note__date">${month} ${date.getDate()}</div>
            </div>
            <div class="note-tools__container">
                <div class="note-tool__button" onclick="editNote(${
                  note.id
                })"><img src="./icons/edit.png" width="15" height="12" alt="edit" /></div>
                <div class="note-tool__button" onclick="openDeleteNote(${
                  note.id
                })"><img src="./icons/delete.png" width="11" height="15" alt="delete" /></div>
            </div>
        </div>`;
    });
    notesContainer.innerHTML = notes.join('');
  }

  function saveNewNote() {
    const id = new Date().getTime();
    const date = new Date();
    const title = inputName.value;
    const body = inputText.value;
    const newNoteData = {
      id,
      title,
      body,
      date,
    };
    noteList.push(newNoteData);
    inputName.value = 'Untitled note';
    inputText.value = '';
    checkNotesLength();
  }

  function saveEditedNote() {
    const noteIndex = noteList.findIndex((note) => note.id === editingNoteId);
    const date = noteList[noteIndex].date;
    const title = inputName.value;
    const body = inputText.value;
    const newNoteData = {
      id: editingNoteId,
      title,
      body,
      date,
    };
    noteList[noteIndex] = newNoteData;
    inputName.value = 'Untitled note';
    inputText.value = '';
  }

  function editNote(id) {
    newNoteContainer.classList.remove('hidden');
    saveNoteBtn.classList.add('hidden');
    saveEditedNoteBtn.classList.remove('hidden');
    const note = noteList.find((note) => note.id === id);
    if (note) {
      inputName.value = note.title;
      inputText.value = note.body;
      editingNoteId = id;
    } else {
      throw new Error('Note not found');
    }
  }
  window.editNote = editNote;

  function openDeleteNote(id) {
    modalDelete.showModal();
    deletingNoteId = id;
  }
  window.openDeleteNote = openDeleteNote;

  function deleteNote() {
    const noteIndex = noteList.findIndex((note) => note.id === deletingNoteId);
    noteList.splice(noteIndex, 1);
    renderNotes();
    checkNotesLength();
    modalDelete.close();
  }

  // Listeners

  addNoteBtn.addEventListener('click', () => {
    newNoteContainer.classList.remove('hidden');
    saveNoteBtn.classList.remove('hidden');
    saveEditedNoteBtn.classList.add('hidden');
  });

  addNoteBtnSecondary.addEventListener('click', () => {
    newNoteContainer.classList.remove('hidden');
    saveNoteBtn.classList.remove('hidden');
    saveEditedNoteBtn.classList.add('hidden');
  });

  cancelBtn.addEventListener('click', () => {
    newNoteContainer.classList.add('hidden');
  });

  saveNoteBtn.addEventListener('click', () => {
    saveNewNote();
    renderNotes();
    newNoteContainer.classList.add('hidden');
  });

  saveEditedNoteBtn.addEventListener('click', () => {
    saveEditedNote();
    renderNotes();
    newNoteContainer.classList.add('hidden');
  });

  inputSearch.addEventListener('input', (e) => {
    renderNotes(
      noteList.filter(
        (note) =>
          note.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          note.body.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  });

  deleteBtn.addEventListener('click', () => {
    deleteNote();
  });

  cancelDeleteBtn.addEventListener('click', () => {
    modalDelete.close();
  });

  // Function calls

  checkNotesLength();
  renderNotes();
  modalDelete.close();
}

document.addEventListener('DOMContentLoaded', init);
