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
    resetSpans();
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    var items = getToDos();
    var title = getInput("title").value;
    var dueDate = new Date(getInput("due-date").value);
    var titleError = document.getElementById("title-error");
    if (title.replace(/\s/g, '') == "") {
        titleError.innerText = "Title can't be empty.";
        titleError.classList.add("error");
        return false;
    }
    if (items != null) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].title == title) {
                titleError.innerText = "Title must be unique.";
                titleError.classList.add("error");
                return false;
            }
        }
    }
    if (isNaN(Date.parse(dueDate.toString()))) {
        var dateError = document.getElementById("date-error");
        dateError.innerText = "Invalid date.";
        dateError.classList.add("error");
        return false;
    }
    return true;
}
function getToDoItem() {
    var title = getInput("title").value;
    var dueDate = new Date(getInput("due-date").value.replace(/-/g, '\/').replace(/T.+/, ''));
    var completed = getInput("completed").checked;
    return new ToDoItem(title, dueDate, completed);
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    console.log(item.dueDate);
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
    var items = getToDos();
    if (items != null) {
        for (var i = 0; i < items.length; i++) {
            if (this.querySelector("h3").innerText == items[i].title) {
                var updatedItem = items[i];
                updatedItem.isCompleted = true;
                items.splice(i, 1);
                items.push(updatedItem);
                localStorage.clear();
                var itemsString = JSON.stringify(items);
                localStorage.setItem(todokey, itemsString);
            }
        }
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
            items[i].dueDate = new Date(items[i].dueDate.toString().replace(/-/g, '\/').replace(/T.+/, ''));
            displayToDoItem(items[i]);
        }
    }
}
function getToDos() {
    var itemString = localStorage.getItem(todokey);
    var items = JSON.parse(itemString);
    return items;
}
function resetSpans() {
    var titleError = document.getElementById("title-error");
    titleError.innerText = "*";
    titleError.classList.remove("error");
    var dateError = document.getElementById("date-error");
    dateError.innerText = "*";
    dateError.classList.remove("error");
}
function resetInputs() {
    throw new Error("Function not implemented.");
}
