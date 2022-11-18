var dueDateInput = document.getElementById("due-date");
dueDateInput.min = new Date().toLocaleDateString('en-ca');
var ToDoItem = (function () {
    function ToDoItem(title, dueDate, isCompleted) {
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
window.onload = function () {
    var add = getInput("add");
    add.onclick = main;
    loadSavedItems();
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var title = getInput("title").value;
    var dueDate = new Date(getInput("due-date").value);
    var completed = getInput("completed").checked;
    return new ToDoItem(title, dueDate, completed);
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var complete = document.getElementById("complete");
        complete.appendChild(itemDiv);
    }
    else {
        var incomplete = document.getElementById("incomplete");
        incomplete.appendChild(itemDiv);
    }
}
function getInput(id) {
    return document.getElementById(id);
}
function markAsComplete() {
    var itemDiv = this;
    if (!itemDiv.classList.contains("completed")) {
        itemDiv.classList.add("completed");
        var completeItems = document.getElementById("complete");
        completeItems.appendChild(itemDiv);
    }
}
var todokey = "todo";
function saveToDo(item) {
    var currItems = getToDos();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
function loadSavedItems() {
    var items = getToDos();
    if (items != null) {
        for (var i = 0; i < items.length; i++) {
            displayToDoItem(items[i]);
        }
    }
}
function getToDos() {
    var itemString = localStorage.getItem(todokey);
    var items = JSON.parse(itemString);
    return items;
}
