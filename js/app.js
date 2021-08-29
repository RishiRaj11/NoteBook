
displayNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById('addText');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myCard = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myCard);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    displayNotes();
});

// function to display from local Storage
function displayNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += ` 
           <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
                <div class="card-body">
                   <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                     <button id="${index}"  onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `
    });
    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    } else {
        notesElement.innerHTML = `Nothing  to show! Use add note to add notes`;
    }
}

//function to delete a note 
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    displayNotes();
}

//Searching box optimization here
let search = document.getElementById('searchText');
let noMatches = document.getElementById('noMatches');
search.addEventListener('input', function () {
    let inputValue = search.value;
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        if (cardText.includes(inputValue) || cardTitle.includes(inputValue)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});