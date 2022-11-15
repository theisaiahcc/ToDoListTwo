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
    var add = document.getElementById("add");
    add.onclick = process;
};
function process() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
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
    itemDate.innerText = item.dueDate.toISOString().split('T')[0];
    var itemDiv = document.createElement("div");
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
