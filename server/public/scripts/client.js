$(document).ready(() => {
  // calls function to add data to DOM
  refreshTasks();
  // sets up user interactions
  addEventListeners();
});

function addEventListeners() {
  // calls function for adding task
  $('#add-btn').click(addTask);
  // input field also adds task on pressing 'enter'
  $('#create-task').keyup(() => {
    if (event.keyCode ==13) {
      addTask();
    }
  });
  // delete buttons use confirm prompt and call delete function if true
  $('#task-table').on('click', '.delete-btn', function() {
    let taskId = $(this).data('taskid');
    if (confirm('Are you sure you want to remove this task?')) {
      deleteTask(taskId);
    }
  });
  // complete buttons call complete function and then are disabled
  $('#task-table').on('click', '.complete-btn', function() {
    let completeId = $(this).data('completeid');
    completeTask(completeId);
    $(this).prop("disabled", true);
  });
}
// requests task data from server
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/taskmaster',
    success: response => appendDom(response)
  });
}
// adds task to database
function addTask() {
  // checks if input field has a value in it and saves value if true
  if($('#create-task').val()) {
    let task = {};
    task.task = $('#create-task').val();
    // checks if high priority checkbox is true and assigns that information
    if($('#priority')[0].checked) {
      task.priority = true;
    } else {
      task.priority = false;
    }
    // sends data to server
    $.ajax({
      type: 'POST',
      url: '/taskmaster',
      data: task,
      success: response => {
        refreshTasks();
        // resets input field
        $('#create-task').val('');
        // resets checkbox
        $('#priority')[0].checked = false;
      }
    });
  }
}
// sends delete request to server
function deleteTask(task) {
  $.ajax({
    type: 'DELETE',
    url: '/taskmaster/' + task,
    success: refreshTasks
  })
}
// sends put request to mark task complete to server
function completeTask(task) {
  $.ajax({
    type: 'PUT',
    url: '/taskmaster/complete/' + task,
    success: refreshTasks
  });
}
// adds task data to DOM
function appendDom(tasks) {
  // empties table's current contents
  $('#task-table').empty();
  // makes table sortable (doesn't currently save re-sorting, may eliminate)
  $('#task-table').sortable();
  // loops through tasks array
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let $tr = $('<tr></tr>');
    $tr.data('task', task);
    // checks if task is complete and adds class if true
    if(!task.complete) {
      // checks if task is high priority and adds class if true
      if(!task.priority) {
        $tr.append(`<td class="task-descr">${task.task}</td>`);
      } else {
        $tr.append(`<td class="task-descr priority">${task.task}</td>`);
      }
      $tr.append('<td class="complete"><button class="complete-btn" data-completeid="'
                 + task.id + '">✔</button></td>');
    } else {
      $tr.append(`<td class="task-descr completed">${task.task} ✔</td>`);
      $tr.append('<td class="complete disabled"><button class="complete-btn" data-completeid="'
                 + task.id + '" disabled>✔</button></td>')
    }
    $tr.append('<td class="delete"><button class="delete-btn" data-taskid="'
               + task.id + '">X</button></td>');
    $('#task-table').append($tr);
  }
}
