const todo = {
  title: "Complete Frontend Wizards Stage 1a",
  description:
    "Build an advanced interactive todo card with editing, state transitions, accessibility support, responsive layout, and proper keyboard navigation for automated testing.",
  priority: "High",
  status: "Pending",
  dueDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
  expanded: false,
};

const titleEl = document.getElementById("todo-title");
const descEl = document.getElementById("todo-description");
const timeEl = document.getElementById("time-text");
const overdueEl = document.getElementById("overdue-indicator");
const statusEl = document.getElementById("status-control");
const checkbox = document.getElementById("todo-check");
const toggleBtn = document.getElementById("expand-toggle");
const editBtn = document.getElementById("edit-btn");
const editForm = document.getElementById("edit-form");

function updateDescription() {
  descEl.textContent = todo.expanded
    ? todo.description
    : todo.description.slice(0, 100) + "...";
}

function updateTime() {
  if (todo.status === "Done") {
    timeEl.textContent = "Completed";
    overdueEl.textContent = "";
    return;
  }

  const diff = todo.dueDate - new Date();
  const mins = Math.floor(Math.abs(diff) / 60000);
  const hours = Math.floor(mins / 60);

  if (diff < 0) {
    overdueEl.textContent = "Overdue ";
    timeEl.textContent = `by ${hours} hour(s)`;
  } else {
    overdueEl.textContent = "";
    timeEl.textContent = `Due in ${hours} hour(s)`;
  }
}

statusEl.addEventListener("change", (e) => {
  todo.status = e.target.value;
  checkbox.checked = todo.status === "Done";
  titleEl.classList.toggle("done", todo.status === "Done");
  updateTime();
});

checkbox.addEventListener("change", () => {
  todo.status = checkbox.checked ? "Done" : "Pending";
  statusEl.value = todo.status;
  titleEl.classList.toggle("done", checkbox.checked);
  updateTime();
});

toggleBtn.addEventListener("click", () => {
  todo.expanded = !todo.expanded;
  toggleBtn.textContent = todo.expanded ? "Collapse" : "Expand";
  toggleBtn.setAttribute("aria-expanded", todo.expanded);
  updateDescription();
});

editBtn.addEventListener("click", () => {
  editForm.classList.toggle("hidden");
});

updateDescription();
updateTime();
setInterval(updateTime, 30000);