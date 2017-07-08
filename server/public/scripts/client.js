$(document).ready(() => {
  refreshTasks();

  $('#submitBtn').click(function() {
    let book = {};
    book.task = $('#create-task').val();
    addTask(book);
  });

  $('#task-table').on('click', '.delete-btn', function() {
    let taskId = $(this).data('taskid');
    console.log(taskId);
    deleteTask(taskId);
  });

  $('#task-table').on('click', '.complete-btn', function() {
    let completeId = $(this).data('completeid')
    completeTask(completeId);
  })
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

function deleteTask(task) {
  $.ajax({
    type: 'DELETE',
    url: '/taskmaster/' + task,
    success: refreshTasks
  })
}

function completeTask(task) {
  $.ajax({
    type: 'PUT',
    url: '/taskmaster/complete/' + task,
    success: refreshTasks
  })
}

function appendDom(tasks) {
  console.log(tasks);
  $('#task-table').empty();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    if (!task.complete) {
      let $tr = $('<tr></tr>');
      $tr.data('task', task);
      $tr.append(`<td>${task.task}</td>`);
      $tr.append(`<td>${task.complete ? "Yes" : "No"}</td>`);
      $tr.append('<td><button class="complete-btn" data-completeid="' + task.id + '">Complete</button></td>');
      $tr.append('<td><button class="delete-btn" data-taskid="' + task.id + '">Delete</button></td>');
      $('#task-table').append($tr);
    }
  }
}
