let entries = [];
const listDiv = document.getElementById("listCont");
const addButton = document.getElementById("entryButton");
const input = document.getElementById("entryInput");
const storageKey = "list elements";

/* ZROBIC!!!!

custom scroll

*/

document.addEventListener("click", () => {
    input.focus();
});

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

function displayEntries(){
    listDiv.innerHTML = null;
    entries.forEach((item, idx) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entryCont"

        const entryText = document.createElement("p");
        entryText.textContent = item[0];
        entryText.className = "entryText";

        const delButton = document.createElement("button");
        delButton.onclick = () => deleteEntry(idx);
        delButton.className = "delButton";
        const image = document.createElement("img");
        image.src = "plus-svgrepo-com.svg";
        image.className = "delIcon"
        delButton.appendChild(image);

        if (!entries[idx][1]) {
            entryText.classList.add("done");
            delButton.classList.add("done");
        }

        entryDiv.appendChild(entryText);
        entryDiv.appendChild(delButton);
        listDiv.appendChild(entryDiv);
    });
}

function rearrangeEntries(idx){
    let length = entries.length - 1;
    if(length == 0) return;
    
    const [temp] = entries.splice(idx, 1);
    length--;
    
    let newIdx = 0;
    while(newIdx <= length && entries[newIdx][1]){
        newIdx++;
    }

    entries.splice(newIdx, 0, temp);
}

function deleteEntry(idx){
    if(entries[idx][1]){
        entries[idx][1] = false;
        rearrangeEntries(idx);
    } else {
        entries.splice(idx, 1);
    }
    displayEntries();
    saveEntries();
}

function addEntry(){
    const value = input.value;
    if(!value) return;

    const newEntry = [value, true]; // states: true - active; false - done; next click deletes it
    entries.unshift(newEntry);
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
