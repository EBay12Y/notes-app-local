import '../src/components/index.js'
import home from '../src/components/view/home.js';

document.addEventListener('DOMContentLoaded', () => {
    home();
    loadNotes();
    setFormListener();

    // Tahun realtime
    const currentYearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    // Validasi Form custom
    const form = document.querySelector('.notes-form');
    const titleInput = form.elements.noteTitle;
    const descInput = form.elements.noteDesc;
    const titleError = document.getElementById('titleError');
    const descError = document.getElementById('descError');

    titleInput.addEventListener('input', () => {
        if (titleError) {
            titleError.textContent = '';
        }
        if (!titleInput.validity.valid) {
            titleError.textContent = 'Judul harus diisi dan minimal 3 karakter.';
        }
    });

    descInput.addEventListener('input', () => {
        if (descError) {
            descError.textContent = '';
        }
        if (!descInput.validity.valid) {
            descError.textContent = 'Deskripsi harus diisi dan minimal 5 karakter.';
        }
    });

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            form.reportValidity();
        }
    });
});

// ===================== Add Note to Local Storage ==========================

function setFormListener() {
    const notesForm = document.getElementById('notesForm');

    notesForm.addEventListener('submit', (e) => {
        if (!notesForm.checkValidity()) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        const noteTitle = document.getElementById('noteTitle').value;
        const noteDesc = document.getElementById('noteDesc').value;

        const note = {
            id: generateUniqueId(),
            title: noteTitle,
            body: noteDesc,
            createdAt: new Date().toISOString(),
            archived: false,
        }

        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.push(note);

        localStorage.setItem('notes', JSON.stringify(notes))

        notesForm.reset();

        loadNotes();
    });
}

function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);

    return `notes-${timestamp}-${randomString}`;
}

function loadNotes() {
    const noteListElement = document.querySelector('note-list');

    // noteListElement.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        noteListElement.append(noteItemElement);
    });
}

/* Reload browser ketika button diclick, agar data di local storage langsung muncul :) */

const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', (e) => {
    const notesForm = document.getElementById('notesForm');
    if (!notesForm.checkValidity()) {
        e.preventDefault();
        notesForm.reportValidity();
    } else {
        location.reload();
    }
});
