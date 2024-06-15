const titleNoteInputElement = document.getElementById('titleNote');
const notesInputElement = document.getElementById('notes');
const taskFormElement = document.getElementById('formulario');
const containerListElement = document.getElementById('containerList');
const containerMessageElement = document.getElementById('message');

const clearInputStyle = () => {
    titleNoteInputElement.style.borderColor = 'black';
    notesInputElement.style.borderColor = 'black';
}

const validateInfo = () => {
    return titleNoteInputElement.value.trim() !== '' && notesInputElement.value.trim() !== '';
}

const clearForm = () => {
    taskFormElement.reset();
    containerMessageElement.innerHTML = '';
    clearInputStyle();
}

const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotesList();
}

const renderNotesList = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    containerListElement.innerHTML = '';
    if (notes.length === 0) {
        containerListElement.innerHTML = '<p>El listado de notas está vacío</p>';
    } else {
        const ol = document.createElement('ol');
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.className = 'listItem';
            
            const div = document.createElement('div');
            div.className = 'itemContent';
            div.innerHTML = `<span>Título: ${note.titleNote}, Notas: ${note.notes}</span>
                             <button class="deleteButton" data-index="${index}">Eliminar</button>`;
            
            li.appendChild(div);
            ol.appendChild(li);
        });
        containerListElement.appendChild(ol);
    }
}

const updateValues = () => {
    const newNote = {
        titleNote: titleNoteInputElement.value.trim(),
        notes: notesInputElement.value.trim(),
    };
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotesList();
}

const sendErrorMessage = () => {
    if (titleNoteInputElement.value.trim() === '') {
        titleNoteInputElement.style.borderColor = 'red';
    }
    if (notesInputElement.value.trim() === '') {
        notesInputElement.style.borderColor = 'red';
    }
    containerMessageElement.innerHTML = '<p>Debes llenar todas las casillas</p>';
}

const submitElements = (e) => {
    e.preventDefault();
    if (validateInfo()) {
        updateValues();
        clearForm();
    } else {
        sendErrorMessage();
    }
}

containerListElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteButton')) {
        const index = e.target.getAttribute('data-index');
        deleteNote(index);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderNotesList();
});

taskFormElement.addEventListener('submit', submitElements);
