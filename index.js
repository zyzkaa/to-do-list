let entries = [];
const listDiv = document.getElementById("listCont");
// const addButton = document.getElementById("entryButton");
const input = document.getElementById("entryInput");
const storageKey = "list elements";

function displayEntries(){
    listDiv.innerHTML = null;
    for(const [idx, item] of Object.entries(entries)){
        const entryDiv = document.createElement("div");
        entryDiv.className = "entryCont"

        const entryText = document.createElement("p");
        entryText.textContent = item;
        entryText.className = "entryText"

        const delButton = document.createElement("button");
        delButton.innerHTML = "delete";
        delButton.onclick = () => deleteEntry(idx);

        const settingsButton = document.createElement("button")
        settingsButton.innerHTML = "settings"

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(delButton);
        entryDiv.appendChild(settingsButton);
        listDiv.appendChild(entryDiv);
    }
}

function deleteEntry(idx){
    entries.splice(idx, 1);
    displayEntries();
    saveEntries();
}

function addEntry(){
    const value = input.value;
    if(!value) return;

    entries.push(value);
    input.value = "";
    displayEntries();
    saveEntries();
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