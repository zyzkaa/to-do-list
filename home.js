let lists = [];
const storageKey = "lists"
const addListButton = document.getElementById("addListButton");

function saveEntries(){
    const stringLists = JSON.stringify(lists);
    localStorage.setItem(storageKey, stringEntries);
}

document.addEventListener("DOMContentLoaded", () => {
    const oldLists = localStorage.getItem(storageKey);
    if(oldLists) lists = JSON.parse(oldEntries);
    
})

addListButton.addEventListener("click", () => {
    
})