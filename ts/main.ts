// sets minimum date to today for due date
let dueDateInput = <HTMLInputElement>document.getElementById("due-date");
dueDateInput.min = new Date().toLocaleDateString('en-ca')

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean

    constructor(title:string, dueDate:Date, isCompleted:boolean){
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
}

window.onload = function(){
    let add = getInput("add");
    add.onclick = main;

    loadSavedItems();
}

function main():void{
    resetSpans();
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
        resetInputs();
    }
}

function isValid():boolean{
    let items = getToDos();
    let title = getInput("title").value;
    let dueDate = new Date(getInput("due-date").value);
    let titleError = document.getElementById("title-error")
    if(title.replace(/\s/g, '') == ""){
        
        titleError.innerText = "Title can't be empty.";
        titleError.classList.add("error");

        return false;
    }

    if(items != null){
        for(let i = 0; i < items.length; i++){
            if (items[i].title == title){
                titleError.innerText = "Title must be unique."
                titleError.classList.add("error");
                return false;
            }
        }
    }
    

    if(isNaN(Date.parse(dueDate.toString()))){
        let dateError = document.getElementById("date-error")
        dateError.innerText = "Invalid date.";
        dateError.classList.add("error");
        return false;

    }
    return true;
}

function getToDoItem():ToDoItem{
    let title = getInput("title").value;
    let dueDate = new Date(getInput("due-date").value.replace(/-/g, '\/').replace(/T.+/, ''));
    let completed = getInput("completed").checked;

    return new ToDoItem(title, dueDate, completed)
}

function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;
    itemText.onclick = markAsComplete;

    let itemDate = document.createElement("p");
    console.log(item.dueDate);

    let dueDate = new Date (item.dueDate.toString()); 
    itemDate.innerText = dueDate.toDateString();

    let exitSpan = document.createElement("span");
    exitSpan.onclick = deleteToDo;
    exitSpan.innerText = "x";

    let itemDiv = document.createElement("div");
    
    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }
    // itemText.appendChild(exitSpan);
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    itemDiv.appendChild(exitSpan);
    
    if(item.isCompleted){
        let complete = document.getElementById("complete");
        complete.appendChild(itemDiv);
    }
    else{
        let incomplete = document.getElementById("incomplete");
        incomplete.appendChild(itemDiv);
    }
}

function getInput(id:string):HTMLInputElement{
    return (<HTMLInputElement>document.getElementById(id))
}

function markAsComplete(){
    let itemDiv = <HTMLElement>this.parentNode;
    if(!itemDiv.classList.contains("completed")){
        itemDiv.classList.add("completed");
    
        let completeItems = document.getElementById("complete");
        completeItems.appendChild(itemDiv);
    }
    let items = getToDos();
    if (items != null){
        for(let i = 0; i < items.length; i++){
            if(this.innerText == items[i].title){
                let updatedItem = items[i];
                updatedItem.isCompleted = true;
                items.splice(i, 1);
                items.push(updatedItem)
                // delete storage and reupload
                localStorage.clear();
                let itemsString = JSON.stringify(items);
                localStorage.setItem(todokey, itemsString);
            }
        }
    }
}

const todokey = "todo"

function saveToDo(item:ToDoItem):void{
    let currItems = getToDos();
    if (currItems == null){
        currItems = new Array();
    }
    currItems.push(item); // add new item to curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString)
}

function loadSavedItems() {
    let items = getToDos();
    if (items != null){
        for(let i = 0; i < items.length; i++){
            // to see why the following code is necessary view this stackoverflow post
            // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
            items[i].dueDate = new Date (items[i].dueDate.toString().replace(/-/g, '\/').replace(/T.+/, ''))
            displayToDoItem(items[i]);
        }
    }
}

/**
 * @returns Stored todo item or NULL if not found
 */
function getToDos():ToDoItem[]{
    let itemString = localStorage.getItem(todokey)
    let items:ToDoItem[] = JSON.parse(itemString);
    // console.log(items);
    return items;
}
function resetSpans() {
    let titleError = document.getElementById("title-error")
    titleError.innerText = "*";
    titleError.classList.remove("error");

    let dateError = document.getElementById("date-error")
        dateError.innerText = "*";
        dateError.classList.remove("error");
}

function resetInputs() {
    (<HTMLInputElement>document.getElementById("title")).value = "";
    (<HTMLInputElement>document.getElementById("due-date")).value = "";
}

function deleteToDo() {
    let itemDiv = this.parentNode;
    itemDiv.remove();

    let items = getToDos();
    for(let i = 0; i < items.length; i++){
        if (itemDiv.querySelector("h3").innerText == items[i].title){
            items.splice(i, 1);
            localStorage.clear();
            let itemsString = JSON.stringify(items);
            localStorage.setItem(todokey, itemsString);
        }
    }
}

