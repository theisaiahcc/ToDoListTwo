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

// let item = new ToDoItem("testing", new Date(2023, 6, 1), false);
window.onload = function(){
    let add = getInput("add");
    add.onclick = process;
}

function process():void{
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

function isValid():boolean{
    return true;
}

function getToDoItem():ToDoItem{
    let title = getInput("title").value;
    let dueDate = new Date(getInput("due-date").value);
    let completed = getInput("completed").checked;

    return new ToDoItem(title, dueDate, completed)
}

function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toISOString().split('T')[0];


    let itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
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
    let itemDiv = <HTMLElement>this;
    if(!itemDiv.classList.contains("completed")){
        itemDiv.classList.add("completed");
    
        let completeItems = document.getElementById("complete");
        completeItems.appendChild(itemDiv);
    }
}