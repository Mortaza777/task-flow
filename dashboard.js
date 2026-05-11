// ---------- Live Time ----------
function updateTime() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();

  document.getElementById("live-time").textContent =
    (h % 12 || 12) +
    ":" +
    String(m).padStart(2, "0") +
    (h >= 12 ? " PM" : " AM");
}

updateTime();
setInterval(updateTime, 1000);

// ---------- Current Date ----------
function updateDate() {
  const now = new Date();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  document.getElementById("current-date").textContent =
    now.toLocaleDateString("en-US", options);
}

updateDate();

const savedUsername = localStorage.getItem("username");

if (savedUsername) {
  document.getElementById("username").innerText =
    `Welcome, ${savedUsername}`;
} else {
  document.getElementById("username").innerText =
    "Welcome back";
}

document.getElementById("addBtn").addEventListener("click", () => {
  window.location.href = "upload-task.html";
});

async function renderTasks() {
  const taskList = document.querySelector(".task-list");

  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }



  console.log("TASK LIST ELEMENT:", taskList);

  taskList.innerHTML = "";

  try {
    const response = await fetch("http://localhost:3000/task/my-task", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 401) {

      localStorage.clear();

      window.location.href = "login.html";
    }

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    const tasks = Array.isArray(data) ? data : data.tasks || data.data;

    console.log("FINAL TASKS:", tasks);

    if (!tasks || !tasks.length) {
      taskList.innerHTML = `
        <div class="empty-card">
          No tasks yet
        </div>
      `;
      return;
    }

    tasks.forEach((task) => {
      const taskCard = document.createElement("div");

      taskCard.classList.add("task-card");

      taskCard.innerHTML = `
  <h3>${task.title}</h3>

  <h4>${task.description}</h4>

  <div class="task-info">
    <span class="task-date">
      📅 ${task.dueDate}
    </span>

    <span class="task-time">
      ⏰ ${task.dueTime}
    </span>

    <button 
      class="delete-btn" 
      onclick="deleteTask(${task.id})"
    >
      Delete
    </button>
  </div>
`;

      taskList.appendChild(taskCard);
    });

  } catch (error) {
    console.log(error);
    alert("Server error while loading tasks");
  }
}

async function deleteTask(id) {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:3000/task/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  renderTasks();
}

renderTasks();