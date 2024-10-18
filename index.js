let entries = [];
const listDiv = document.getElementById("listCont");
const addButton = document.getElementById("entryButton");
const input = document.getElementById("entryInput");
const storageKey = "list elements";

/* ZROBIC!!!!

custom scroll

*/

function enforceFocus() {
    input.focus();
}
document.addEventListener("click", enforceFocus);

input.addEventListener("keypress", function(event) {
    if(event.key == "Enter") {
        event.preventDefault();
        addEntry();
    }
});

addButton.addEventListener('click', () => {
    const icon = document.getElementById("addIcon");

    const value = input.value;
    if(!value) return;
    icon.classList.add('animate');

    icon.addEventListener('animationend', () => {
        icon.classList.remove('animate');
    })
})

function makeDelButton(idx) {
    const delButton = document.createElement("button");
    delButton.onclick = () => deleteEntry(idx);
    delButton.className = "delButton";

    const image = document.createElement("img");
    image.src = "plus-svgrepo-com.svg";
    image.className = "delIcon"
    delButton.appendChild(image);

    return delButton;
}

function displayEntries(){
    listDiv.innerHTML = null;
    for(const [idx, item] of Object.entries(entries)){
        const entryDiv = document.createElement("div");
        entryDiv.className = "entryCont"

        const entryText = document.createElement("p");
        entryText.textContent = item;
        entryText.className = "entryText";

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(makeDelButton(idx));
        listDiv.appendChild(entryDiv);
    }
}

function deleteEntry(idx){
    if(entries[idx][1]){
        entries[idx][1] = false;
    } else {
        entries.splice(idx, 1);
    }
    displayEntries();
    saveEntries();
}

function addEntry(){
    const value = input.value;
    if(!value) return;


    let newEntry = [value, true]; // states: true - active; false - done; next click deletes it
    entries.push(newEntry);
    input.classList.add('animate');
    addButton.disabled = true;
    input.disabled = true;

    setTimeout(() => {
        input.value = "";
        displayEntries();
        saveEntries();
        input.classList.remove('animate');
        addButton.disabled = false;
        input.disabled = false;
        input.focus();
    }, 250);
}

function saveEntries(){
    const stringEntries = JSON.stringify(entries);
    localStorage.setItem(storageKey, stringEntries);
}

document.addEventListener("DOMContentLoaded", () => {
    const oldEntries = localStorage.getItem(storageKey);
    if(oldEntries) entries = JSON.parse(oldEntries);
    displayEntries();
})
