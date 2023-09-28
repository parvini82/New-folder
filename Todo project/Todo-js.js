var Tasks = [];

function Task(name, description, date, priority) {
  this.name = name;
  this.description = description;
  this.date = date;
  this.priority = priority;
}

Task.prototype.toString = function() {
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

  var taskItem = $('<li>').addClass('list-group-item task-ite '+colorSelector(priority)+'').text(newTask.toString());
    $('#task-list').append(taskItem);
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
function colorSelector(priority){
  switch (priority) {
    case "low":
      return "bg-primary"
    case "medium":
      return "bg-warning"
    case "high":
      return "bg-danger"  
  
  }


}