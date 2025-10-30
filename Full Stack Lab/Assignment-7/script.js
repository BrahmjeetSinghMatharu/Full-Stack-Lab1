const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "") {
    alert("Please enter a task title!");
    return;
  }

  createTask(title, desc);
  form.reset();
});

function createTask(title, desc) {
  const taskBox = document.createElement("div");
  taskBox.className = "task";

  const contentDiv = document.createElement("div");
  contentDiv.className = "task-content";

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;

  const taskDesc = document.createElement("p");
  taskDesc.textContent = desc;

  contentDiv.appendChild(taskTitle);
  contentDiv.appendChild(taskDesc);

  const actionDiv = document.createElement("div");
  actionDiv.className = "task-actions";

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔ Done";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", () => {
    taskTitle.classList.toggle("completed");
    taskDesc.classList.toggle("completed");
    completeBtn.textContent = taskTitle.classList.contains("completed")
      ? "↩ Undo"
      : "✔ Done";
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️ Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "✏️ Edit") {
      editBtn.textContent = "💾 Save";

      const newTitleInput = document.createElement("input");
      newTitleInput.type = "text";
      newTitleInput.value = taskTitle.textContent;

      const newDescInput = document.createElement("textarea");
      newDescInput.value = taskDesc.textContent;

      contentDiv.replaceChild(newTitleInput, taskTitle);
      contentDiv.replaceChild(newDescInput, taskDesc);
    } else {
      editBtn.textContent = "✏️ Edit";
      const newTitle = contentDiv.querySelector("input").value;
      const newDesc = contentDiv.querySelector("textarea").value;

      taskTitle.textContent = newTitle;
      taskDesc.textContent = newDesc;

      contentDiv.replaceChild(taskTitle, contentDiv.querySelector("input"));
      contentDiv.replaceChild(taskDesc, contentDiv.querySelector("textarea"));
    }
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑 Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => taskList.removeChild(taskBox));

  actionDiv.appendChild(completeBtn);
  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);

  taskBox.appendChild(contentDiv);
  taskBox.appendChild(actionDiv);
  taskList.appendChild(taskBox);
}