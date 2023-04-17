const form = document.getElementById("list-form");
const input = document.getElementById("list-form-input");
const lists = document.getElementById("lists");

lists.addEventListener("click", (e) => {
  console.log(e);

  const clickedEl = e.target;

  const list = clickedEl.parentElement.parentElement;

  if (clickedEl.innerText.toLowerCase() === "delete") {
    lists.removeChild(list);
    saveData();
  }

  // Check if button is edit
  // if yes - then change the text to Save and text change is possible and remove readonly attribute
  if (clickedEl.innerText.toLowerCase() === "edit") {
    const input = clickedEl.parentElement.previousElementSibling.children[0];

    input.removeAttribute("readonly");
    input.focus();
    clickedEl.innerText = "Save";

    return;
  }

  // if the button is save then add readonly attribute
  if (clickedEl.innerText.toLowerCase() === "save") {
    const input = clickedEl.parentElement.previousElementSibling.children[0];
    const value = input.value;

    input.value = value;
    input.defaultValue = value;
    input.setAttribute("readonly", "readonly");
    clickedEl.innerText = "edit";
    saveData();
  }

  // I clicked input fiels in a todo row
  if (clickedEl.classList.contains("todo-text")) {
    const editButton = clickedEl.parentElement.nextElementSibling.children[0];

    if (editButton.innerHTML.toLowerCase() === "edit") {
      if (clickedEl.classList.contains("marked")) {
        clickedEl.classList.remove("marked");
      } else {
        clickedEl.classList.add("marked");
      }
    }
  }
});

window.addEventListener("load", () => {
  // Add action to form (create a tasks)
  form.addEventListener("submit", (e) => {
    console.log(e);
    // No page reload
    e.preventDefault();

    // Value from input
    const list = input.value;

    if (!list) {
      alert("Please fill out a to do!");
      return;
    }

    // Add task div
    const to_do_el = document.createElement("div");
    to_do_el.classList.add("list");

    // Add content div to task
    const to_do_content_el = document.createElement("div");
    to_do_content_el.classList.add("content");
    to_do_el.appendChild(to_do_content_el);

    // Add input to content div
    const to_do_input_el = document.createElement("input");
    to_do_input_el.classList.add("text", "todo-text");
    to_do_input_el.type = "text";
    to_do_input_el.value = list;
    to_do_input_el.defaultValue = list;
    to_do_input_el.setAttribute("readonly", "readonly");
    to_do_content_el.appendChild(to_do_input_el);

    //Add action div of task
    const to_do_action_el = document.createElement("div");
    to_do_action_el.classList.add("actions");

    to_do_el.appendChild(to_do_action_el);

    // Add button edit to action div
    const to_do_button_edit_el = document.createElement("button");
    to_do_button_edit_el.classList.add("edit");
    // to_do_button_edit_el.dataset.id = id;
    to_do_button_edit_el.innerHTML = "Edit";

    // Add button delete to action div
    const to_do_button_delete_el = document.createElement("button");
    to_do_button_delete_el.classList.add("delete");
    to_do_button_delete_el.innerHTML = "Delete";

    to_do_action_el.appendChild(to_do_button_edit_el);
    to_do_action_el.appendChild(to_do_button_delete_el);

    // Add task div to the list tasks
    lists.appendChild(to_do_el);

    input.value = "";

    saveData();
  });
});

function saveData() {
  localStorage.setItem("data", lists.innerHTML);
}

function showTask() {
  lists.innerHTML = localStorage.getItem("data");
}

showTask();
