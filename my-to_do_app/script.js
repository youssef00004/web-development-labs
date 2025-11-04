const addButton = document.querySelector(".addButton");
const inputElement = document.querySelector(".inputElement");
const list = document.querySelector(".todoItems");
const filterButtons = document.querySelectorAll(".filterButton");

let todoItemsarray = [];
let currentFilter = "all";

// === Add event listeners ===
addButton.addEventListener("click", addtodoItems);
inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addtodoItems();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    highlightActiveButton(currentFilter);
    render(currentFilter);
  });
});

// === Add a new todo ===
function addtodoItems() {
  const input = inputElement.value.trim();
  if (input === "") return; // prevent empty todos

  todoItemsarray.push({ input, done: false });
  inputElement.value = "";
  render(currentFilter);
}

// === Render todos based on current filter ===
function render(filter = "all") {
  list.innerHTML = "";

  const filteredItems = todoItemsarray.filter((item) => {
    if (filter === "active") return !item.done;
    if (filter === "completed") return item.done;
    return true; // all
  });

  filteredItems.forEach((item) => {
    const divElement = document.createElement("div");
    const listElement = document.createElement("li");

    // === Checkbox for marking complete ===
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.done;

    const label = document.createElement("span");
    label.textContent = item.input;

    // Style completed todos
    if (item.done) {
      label.style.textDecoration = "line-through";
      label.style.color = "gray";
    }

    // When checkbox clicked, toggle done
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      render(filter);
    });

    // === Delete Button ===
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      todoItemsarray = todoItemsarray.filter((t) => t !== item);
      render(filter);
    });

    // === Build the structure ===
    listElement.appendChild(checkbox);
    listElement.appendChild(label);
    divElement.appendChild(listElement);
    divElement.appendChild(deleteButton);
    list.appendChild(divElement);
  });
}

// === Highlight active filter button ===
function highlightActiveButton(activeFilter) {
  filterButtons.forEach((button) => {
    if (button.dataset.filter === activeFilter) {
      button.style.backgroundColor = "#007BFF";
      button.style.color = "white";
    } else {
      button.style.backgroundColor = "";
      button.style.color = "";
    }
  });
}

// === Initial render ===
render();
highlightActiveButton("all");
