var Tasks = [];

function Task(name, description, date, priority) {
  this.name = name;
  this.description = description;
  this.date = date;
  this.priority = priority;
}

Task.prototype.toString = function () {
  return "Name: " + this.name + ", Description: " + this.description + ", Date: " + formatDate(this.date) + ", Priority: " + this.priority;
};

function add() {
  var name = document.getElementById("task-name").value;
  var description = document.getElementById("task-description").value;
  var date = $('#datepicker').datepicker('getDate');
  var priority = document.getElementById("task-priority").value;

  if (name.trim() === '') {
    alert('Please enter a task name.');
    return;
  }

  var newTask = new Task(name, description, date, priority);
  Tasks.push(newTask);
  TasksDisplay();
  clear();
}

function clear() {
  document.getElementById("task-name").value = '';
  document.getElementById("task-description").value = '';
  $('#datepicker').datepicker('setDate', null);
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return month + '-' + day + '-' + year;
}

function colorSelector(priority) {
  switch (priority) {
    case "low":
      return "bg-primary";
    case "medium":
      return "bg-warning";
    case "high":
      return "bg-danger";
  }
}

var checkboxes = document.getElementsByClassName('task-checkbox');
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', handleTaskCompletion);
}

function handleTaskCompletion(event) {
  var checkbox = event.target;
  var taskItem = checkbox.parentNode.parentNode;
  if (checkbox.checked) {
    taskItem.classList.add('completed');
  } else {
    taskItem.classList.remove('completed');
  }
}

function TasksDisplay() {
  var taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear existing tasks
  
  for (var i = 0; i < Tasks.length; i++) {
    var task = Tasks[i];
    var taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'task-item', colorSelector(task.priority));
    
    var taskName = document.createElement('h4');
    taskName.innerText = task.name;
    taskItem.appendChild(taskName);
    
    var taskDescription = document.createElement('p');
    taskDescription.innerText = task.description;
    taskItem.appendChild(taskDescription);
    
    var taskDate = document.createElement('p');
    taskDate.innerText = formatDate(task.date);
    taskItem.appendChild(taskDate);
    
    taskList.appendChild(taskItem);
  }
}