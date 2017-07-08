$(document).ready(() => {
  refreshTasks();

  $('#submitBtn').click(function() {
    let book = {};
    book.task = $('#create-task').val();
    addTask(book);
  });
});

function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/taskmaster',
    success: response => appendDom(response)
  });
}

function addTask(taskToAdd) {
  $.ajax({
    type: 'POST',
    url: '/taskmaster',
    data: taskToAdd,
    success: function(response) {
      refreshTasks();
    }
  });
}

function appendDom(tasks) {
  console.log(tasks);
  $('#task-table').empty();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append(`<td>${task.task}</td>`);
    $tr.append(`<td>${task.complete ? "Yes" : "No"}</td>`);
    $tr.append('<td><button class="complete-btn">Complete</button></td>');
    $tr.append('<td><button class="delete-btn">Delete</button></td>');
    $('#task-table').append($tr);
  }
}
