const addBtn = document.getElementById('addBtn');
const main = document.getElementById('main');
let save = document.querySelectorAll('.save');
let trash = document.querySelectorAll('.trash');

let numberNotes;

addBtn.addEventListener('click', addNote);

function countNotes(){
    numberNotes = document.querySelectorAll('.note').length + 1
}

function saveAndDelete(){
    save = document.querySelectorAll('.save');
    trash = document.querySelectorAll('.trash');

    save.forEach(function(element){
        element.addEventListener('click', function(event){
            var saveClicked = event.target;
            var element = saveClicked.parentElement.parentElement;
            var noteId = element.id;
            saveNotes(noteId)
        })
    })

    trash.forEach(function(element){
        element.addEventListener('click', function(event){
            var trashClicked = event.target;
            var element = trashClicked.parentElement.parentElement;
            var noteId = element.id;
            element.remove();
            localStorage.removeItem(noteId)
        })
    })

}

function addNote(){
    countNotes();

    const note = document.createElement('div');
    note.classList.add('note');
    let noteId =   `nota-${numberNotes}`;
    note.id = noteId;
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <textarea></textarea>
    `
    main.appendChild(note);

    saveAndDelete();
}

function saveNotes(noteId){
    const note = document.querySelector(`.note#${noteId}`);
    const noteContent = note.innerHTML
    const inputContent = document.querySelector(`.note#${noteId} textarea`).value
    if(inputContent != ''){
        const noteData = {
            noteId: noteId,
            noteContent: noteContent,
            inputContent: inputContent
        }
        localStorage.setItem(noteId, JSON.stringify(noteData))
    }
}

function deleteNote(note, noteId){
    note.remove();
    localStorage.removeItem(noteId)
}

function loadNote(noteId){
    const noteData = JSON.parse(localStorage.getItem(noteId))
    const container = document.createElement('div')
    container.classList.add("note")
    container.id = noteId
    container.innerHTML = noteData.noteContent;
    main.appendChild(container)
    const input = document.querySelector(`.note#${noteId} textarea`);
    input.value = noteData.inputContent;
}

function loadNotes(){
    if(localStorage.length != 0){
        for(i = 1;i<=localStorage.length;i++){
            let note = `nota-${i}`
            loadNote(note)
        }
    }else{
        addNote()
    }
}

loadNotes();

save = document.querySelectorAll('.save');
trash = document.querySelectorAll('.trash');

save.forEach(function(element){
    element.addEventListener('click', saveAndDelete())
})

trash.forEach(function(element){
    element.addEventListener('click', saveAndDelete())
})