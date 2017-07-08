$(document).ready(() => {
  refreshTasks();

  $('#submitBtn').click(function() {
    let book = {};
    book.task = $('#create-task').val();
    addTask(book);
  });

  $('#task-table').on('click', '.delete-btn', function() {
    let taskId = $(this).data('taskid');
    console.log($(this));
    console.log(taskId);
    if (confirm('Are you sure you want to remove this task?')) {
      deleteTask(taskId);
    }
  });

  $('#task-table').on('click', '.complete-btn', function() {
    let completeId = $(this).data('completeid')
    completeTask(completeId);
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
      $('#create-task').val('');
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
  });
}

function appendDom(tasks) {
  console.log(tasks);
  $('#task-table').empty();
  $('#task-table').sortable();
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let $tr = $('<tr></tr>');
    $tr.data('task', task);
    if(!task.complete) {
      $tr.append(`<td class="task-descr">${task.task}</td>`);
    } else {
      $tr.append(`<td class="task-descr completed">${task.task} ✔</td>`);
    }
    $tr.append('<td class="complete"><button class="complete-btn" data-completeid="' + task.id + '">✔</button></td>');
    $tr.append('<td class="delete"><button class="delete-btn" data-taskid="' + task.id + '">X</button></td>');
    $('#task-table').append($tr);
    console.log($tr);
  }
}
