// window.localStorage.getItem('name');


window.addEventListener('load', () => {
  const form = document.getElementById('new-task-form');
  const input = document.getElementById('new-task-input');
  const list = document.getElementById('tasks');

  // Add action to form (create a tasks)
  form.addEventListener('submit', (e) => {

    // No page reload
    e.preventDefault();

    // Value from input
    const task = input.value;

    if (!task) {
      alert('Please fill out the task!');
      return;
    }

    // Add task div
    const task_el = document.createElement('div');
    task_el.classList.add('task');

    // Add content div to task
    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');
    task_el.appendChild(task_content_el);

    // Add input to content div
    const task_input_el = document.createElement('input');
    task_input_el.classList.add('text');
    task_input_el.type = 'text';
    task_input_el.value = task;
    // 'readonly' - default input
    task_input_el.setAttribute('readonly' , 'readonly');
    task_content_el.appendChild(task_input_el);

    // Add action div of task
    const task_action_el = document.createElement('div');
    task_action_el.classList.add('actions');

    task_el.appendChild(task_action_el);
    console.log(task_action_el)

    // Add button edit to action div
    const task_button_edit_el = document.createElement('button');
    task_button_edit_el.classList.add('edit');
    task_button_edit_el.innerHTML = 'Edit';

    // Add button delete to action div
    const task_button_delete_el = document.createElement('button');
    task_button_delete_el.classList.add('delete');
    task_button_delete_el.innerHTML = 'Delete';

    task_action_el.appendChild(task_button_edit_el);
    task_action_el.appendChild(task_button_delete_el);

    // Add task div to the list tasks
    list.appendChild(task_el);

    input.value = '';

    task_button_edit_el.addEventListener('click', () => {

      // Check if button is edit
      // if yes - then change the text to Save and text change is possible
      if (task_button_edit_el.innerText.toLowerCase() == 'edit') {
        task_input_el.removeAttribute('readonly');
        task_input_el.focus();
        task_button_edit_el.innerText = 'Save';
      } else {
        task_input_el.setAttribute('readonly', 'readonly');
        task_button_edit_el.innerText = 'edit';
      }
    });

    task_button_delete_el.addEventListener('click', () => {

      // Remove the task
      list.removeChild(task_el);
    })
  })
})
