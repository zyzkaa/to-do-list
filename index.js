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
            entryDiv.classList.add("completed");
            entryDiv.classList.remove("shift");
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

    const divs = document.getElementsByClassName("entryCont");
    for(let i = idx; i <= newIdx; i++){
        divs[i].classList.add("shift")
    }
    
    setTimeout(() => {
        entries.splice(newIdx, 0, temp);
        document.getElementsByClassName("entryCont")[newIdx].classList.add("show");
        console.log(document.getElementsByClassName("entryCont")[newIdx]);
    }, 205);
}


// najpierw sie skresla, potem znika i pojawia sie na swoim miejscu

function deleteEntry(idx){
    if(entries[idx][1]){
        entries[idx][1] = false;
        const text = document.getElementsByClassName("entryText")[idx];
        const button = document.getElementsByClassName("delButton")[idx];
        text.classList.add('animate');

        let count = 0;
        entries.forEach((element) => {
            if (element[1]) {count++};
        });

        if(idx == count){
            setTimeout(() => {
                displayEntries();
                saveEntries();
            }, 205);
            return;
        }
        
        button.classList.add('hide');

        setTimeout(() => {
            text.classList.add('hide');

            setTimeout(() => {
                rearrangeEntries(idx);

                setTimeout(() => {
                    displayEntries();
                    saveEntries();
                }, 205);

            }, 205);

        }, 205);
        
    } else {
        entries.splice(idx, 1);
        displayEntries();
        saveEntries();
    }
}

function inputOff(){
    addButton.disabled = true;
    input.disabled = true;
}

function inputOn(){
    addButton.disabled = false;
    input.disabled = false;
    input.focus();
}

function addEntry(){
    const value = input.value;
    if(!value) return;

    const newEntry = [value, true]; // states: true - active; false - done; next click deletes it

    inputOff();

    listDiv.classList.add('animate');
    input.classList.add('animate');

    setTimeout(() => {
        input.value = "";

        input.classList.remove('animate');
        listDiv.classList.remove('animate');

        entries.unshift(newEntry);
        displayEntries();
        saveEntries();

        inputOn();

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

function clear(){
    localStorage.clear();
}

