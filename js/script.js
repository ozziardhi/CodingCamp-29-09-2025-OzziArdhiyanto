// Ambil referensi element
console.log('hello world')

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskTableBody = document.getElementById("taskTableBody");

// Tempat array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Menampilkan data
function renderTasks() {
  taskTableBody.innerHTML = "";

  if (tasks.length === 0) {
    taskTableBody.innerHTML = `
      <tr class="bg-slate-950 text-gray-400 text-center">
        <td colspan="4" class="py-3">No task found</td>
      </tr>`;
    return;
  }

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.className = "bg-slate-950 text-center";

    row.innerHTML = `
      <td class="py-2">${task.name}</td>
      <td class="py-2">${task.date || "-"}</td>
      <td class="py-2">${task.completed ? " Done" : " Pending"}</td>
      <td class="py-2 space-x-2">
        <button onclick="toggleStatus(${index})" class="bg-green-500 px-2 py-1 rounded-md text-sm">Ket</button>
        <button onclick="deleteTask(${index})" class="bg-red-500 px-2 py-1 rounded-md text-sm">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

// Tambah task
addBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskName === "") {
    alert("Task tidak boleh kosong!");
    return;
  }
  if (taskName === "" || taskDate === "") {
    alert("Task dan Tanggal tidak boleh kosong!");
    return;
  }

  const newTask = {
    name: taskName,
    date: taskDate,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  dateInput.value = "";

  renderTasks();
});

// Hapus semua task
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin menghapus semua task?")) {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
});

// Toggle status task
function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Hapus task tertentu
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Pertama kali render
renderTasks();
