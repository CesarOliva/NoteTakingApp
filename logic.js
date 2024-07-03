// Elements we're going to use
const addBtn = document.getElementById('addBtn');
const main = document.getElementById('main');
let save = document.querySelectorAll('.save');
let trash = document.querySelectorAll('.trash');
//Starting the variable which counts the number of Notes on the HTML
let numberNotes = 0;

//Clicking addNote
addBtn.addEventListener('click', addNote);

//Add notes
function addNote(){
    //Re-number notes
    renumberNotes();
    
    //Increase the number of notes
    numberNotes++;
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

    //Calls the function to in order to match the number of notes
    saveAndDelete();
}

//Save note on LocalStorage
function saveNote(noteId){
    const note = document.querySelector(`.note#${noteId}`);
    const noteContent = note.innerHTML
    const inputContent = document.querySelector(`.note#${noteId} textarea`).value
    //Save the note when it's not empty
    if(inputContent != ''){
        //JSON Object to save on Local Storage
        const noteData = {
            noteId: noteId,
            noteContent: noteContent,
            inputContent: inputContent
        }
        //Saving note on LocalStorage
        localStorage.setItem(noteId, JSON.stringify(noteData))
    }
}

//Delete note on Local Storage and HTML
function deleteNote(note, noteId){
    note.remove();
    localStorage.removeItem(noteId);
    //Calls the function to update the number of notes
    renumberNotes();
}

//Function that reloads the number of notes by using the save and delete elements.
function saveAndDelete(){
    save = document.querySelectorAll('.save');
    trash = document.querySelectorAll('.trash');

    //Click on the save element of every note
    save.forEach(function(element){
        element.addEventListener('click', function(event){
            var saveClicked = event.target;
            var element = saveClicked.parentElement.parentElement;
            var noteId = element.id;
            //Save the note
            saveNote(noteId)
        })
    })

    //Click on the delete element of every note
    trash.forEach(function(element){
        element.addEventListener('click', function(event){
            var trashClicked = event.target;
            var element = trashClicked.parentElement.parentElement;
            var noteId = element.id;
            //Delete the note
            deleteNote(element, noteId);
        })
    })
}

//Renumber notes and change the number of note on Id and LocalStorage
function renumberNotes(){
    const notes = document.querySelectorAll('.note');
    numberNotes=0;
    notes.forEach(note => {
        numberNotes++;
        note.id = `nota-${numberNotes}`;
    })
}

//Get every note from the LocalStorage
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

//Loads all notes from the localStorage to put in the HTML
function loadNotes(){
    //If localStorage isn't empty
    if(localStorage.length != 0){
        //Starts an empty array to save the Id number
        var ArrayId = []
        for(i=0;i<localStorage.length;i++){
            ArrayId[i] = parseInt(localStorage.key(i).replace('nota-',''))
            //Ordering array 
            ArrayId.sort((a,b)=>a-b)
            //Save the last Id
            var lastId = ArrayId[i]
        }
        for(i=lastId+1;i>=1;i--){
        // for(i=1;i<=lastId;i++){
            if(ArrayId.includes(i)){
                let note = 'nota-'+i;
                loadNote(note)
            }
        }
    }else{
        //Otherwise charge one note
        addNote()
    }
}

loadNotes();

//In order to solve the problem of not updating corretly the number of notes on the HTML
function preCharge(){
    save = document.querySelectorAll('.save');
    save.forEach(function(element){
        element.addEventListener('click', saveAndDelete())
    })
    
    trash = document.querySelectorAll('.trash');
    trash.forEach(function(element){
        element.addEventListener('click', saveAndDelete())
    })
}

preCharge();



///MEJORAS
/*
ACOMODAR CONFORME A SE GUARDEN
*/ 