const addBtn = document.getElementById('addBtn');
const main = document.getElementById('main');

addBtn.addEventListener('click', addNote);

function addNote(){
    const nota = document.createElement('div');
    nota.classList.add('note');
    nota.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea></textarea>
    `
    main.appendChild(nota);
    
    const save = nota.querySelector('.save');
    const trash = nota.querySelector('.trash');

    save.addEventListener('click', saveNotes)

    trash.addEventListener('click', () => {
        nota.remove();
        saveNotes();
    })
}

function saveNotes(){
    const notes = document.querySelectorAll('.note textarea')
    const data = Array.from(notes).map(note => note.value);

    if(data.length === 0){
        localStorage.removeItem('notes')
    }else{
        localStorage.setItem('notes', JSON.stringify(data))
    }
}

function loadNotes(){
    const lsNotes = JSON.parse(localStorage.getItem('notes'));
    if(lsNotes != null){
        lsNotes.forEach(noteText =>{
            addNote();
            const notes = document.querySelectorAll(".note textarea")
            const lastNote = notes[notes.length-1]
            lastNote.value = noteText;
        });
    }else{
        addNote();
    }
}

loadNotes();