console.log("test");
const form = document.getElementById("list-form");
const input = document.getElementById("list-form-input");
const lists = document.getElementById("lists");

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
    to_do_input_el.classList.add("text");
    to_do_input_el.type = "text";
    to_do_input_el.value = list;
    // 'readonly' - default input
    to_do_input_el.setAttribute("readonly", "readonly");
    to_do_content_el.appendChild(to_do_input_el);

    // Add action div of task
    const to_do_action_el = document.createElement("div");
    to_do_action_el.classList.add("actions");

    to_do_el.appendChild(to_do_action_el);

    // Add button edit to action div
    const to_do_button_edit_el = document.createElement("button");
    to_do_button_edit_el.classList.add("edit");
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

    to_do_button_edit_el.addEventListener("click", () => {
      e.preventDefault();

      // Check if button is edit
      // if yes - then change the text to Save and text change is possible
      if (to_do_button_edit_el.innerText.toLowerCase() === "edit") {
        // Remove marked function
        to_do_input_el.removeEventListener("click", markedToDo);
        to_do_input_el.removeAttribute("readonly");
        to_do_input_el.focus();
        to_do_button_edit_el.innerText = "Save";
      } else {
        to_do_input_el.setAttribute("readonly", "readonly");
        to_do_button_edit_el.innerText = "edit";
        to_do_input_el.addEventListener("click", markedToDo);
      }
    });

    to_do_button_delete_el.addEventListener("click", () => {
      // Remove the task
      lists.removeChild(to_do_el);
    });

    to_do_input_el.addEventListener("click", markedToDo);

    function markedToDo() {
      // When a to do is clicked, it will be marked
      to_do_input_el.classList.add("marked");
      to_do_action_el.removeChild(to_do_button_edit_el);
    }

    // to_do_input_el.addEventListener("click", function () {
    //   // When a to do is clicked, it will be marked
    //   to_do_input_el.classList.add("marked");
    //   to_do_action_el.removeChild(to_do_button_edit_el);
    // });
  });
});
