const addBtn = document.getElementById('addBtn');
const main = document.getElementById('main');
let numberNotes;

addBtn.addEventListener('click', addNote);

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

    const save = note.querySelector('.save');
    save.addEventListener('click', ()=>{
        saveNotes(noteId)
    });

    // const trash = note.querySelector('.trash');
    // trash.addEventListener('click', ()=>{
    //     note.remove();
    //     countNotes();
    // });
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

function countNotes(){
    numberNotes = document.querySelectorAll('.note').length + 1
}

function loadNote(noteId){
    const noteData = JSON.parse(localStorage.getItem(noteId))
    const container = document.createElement('div')
    container.classList.add("note")
    container.id = noteId
    container.innerHTML = noteData.noteContent;
    main.appendChild(container)
    console.log(noteData.noteContent)
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