// Elements we're going to use
const addBtn = document.getElementById('addBtn');
const main = document.getElementById('main');
let save = document.querySelectorAll('.save');
let trash = document.querySelectorAll('.trash');
//Variable which saves the number of notes saved on the LocalStorage
var numberNotes = localStorage.length;

//Clicking addNote
addBtn.addEventListener('click', addNote);

//Count the number of notes
function countNotes(){
    numberNotes = localStorage.length;
}

//Update the ID from the localStorage and HTML
function renumberNotes(notes, elementsLS){
    for(i=0;i<elementsLS.length;i++){
        if(notes[i].id != `nota-${i+1}`){
            let noteId = notes[i].id;
            //Getting the element from LocalStorge
            const noteData = JSON.parse(localStorage.getItem(noteId));
            //Update the element from the HTML
            notes[i].id = `nota-${i+1}`;
            //Change the Id from the note;
            noteData.noteId = notes[i].id;
            //Save the note with a new Id
            localStorage.setItem(noteData.noteId, JSON.stringify(noteData));
            //Delete the previous note;
            localStorage.removeItem(noteId)
        }
    }
}

//Add notes
function addNote(){ 
    const notes = document.querySelectorAll('.note')
    //To not add more than one note
    if(localStorage.length == notes.length){
        //Calls the function to get the number of current notes on the LocalStorage
        countNotes();
        const note = document.createElement('div');
        note.classList.add('note');
        const noteId = `nota-${numberNotes+1}`
        note.id = noteId;
        note.innerHTML = `
        <div class="tool">
            <i class="save fa-solid fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea></textarea>
        `
        main.insertAdjacentElement('afterbegin', note);
    
        //Calls the function to in order to match the number of notes
        saveAndDelete();
    }
}

//Save note on LocalStorage
function saveNote(element){
    //Getting the id of the element saved
    var noteId = element.id;

    var arrayNotes = []
    for(i=0;i<localStorage.length;i++){
        arrayNotes[i] = localStorage.key(i);
    }
    //If the id doesn't exist
    if(!arrayNotes.includes(noteId)){
        countNotes();
        noteId = `nota-${numberNotes+1}`;
    }
    const note = document.querySelector(`.note#${noteId}`);
    const noteContent = note.innerHTML;
    const inputContent = document.querySelector(`.note#${noteId} textarea`).value
    //Save when the note it's not empty
    if(inputContent != ''){
        //JSON Object to save on localStorage
        const noteData = {
            noteId: noteId,
            noteContent: noteContent,
            inputContent: inputContent
        }
        //Saving note on LocalStorage
        localStorage.setItem(noteId, JSON.stringify(noteData));
    }
}

//Delete note on Local Storage and HTML
function deleteNote(note){
    //Detelte from the HTML
    note.remove();
    //If localStorage isn't empty
    if(localStorage.length>0){
        //Gets the notes on the HTML
        const notes = document.querySelectorAll('.note');
        const elementsLS = []
        
        //Fills the elementLS array
        for(i=0;i<localStorage.length;i++){
            //Saves the element from the localStorage
            elementsLS.push(localStorage.key(i))
        }
        elementsLS.sort((a,b)=>{
            a = parseInt(a.split('-')[1])
            b = parseInt(b.split('-')[1])
            return a-b;
        })
        if(note.id == elementsLS[elementsLS.length-1]){
            localStorage.removeItem(elementsLS[elementsLS.length-1])
        }else{
            renumberNotes(notes, elementsLS);
        }
    }
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
            //Save the note and send the element
            saveNote(element)
        })
    })

    //Click on the delete element of every note
    trash.forEach(function(element){
        element.addEventListener('click', function(event){
            var trashClicked = event.target;
            var element = trashClicked.parentElement.parentElement;
            //Delete the note
            deleteNote(element);
        })
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
    if(localStorage.length>0){
        for(i=localStorage.length;i>0;i--){
            let nota = `nota-${i}`
            loadNote(nota)
        }
        //In order to solve the problem of not updating corretly the number of notes on the HTML
        saveAndDelete();
    }else{
        //Otherwise charge one note
        addNote()
    }
}

loadNotes();