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

// ---------- Default Date ----------
const today = new Date().toISOString().split("T")[0];
document.getElementById("task-date").value = today;

// ---------- Save Task ----------
async function submitTask() {
  const name = document.getElementById("task-name").value.trim();
  const desc = document.getElementById("task-desc").value.trim();
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;

  if (!name || !date || !time) {
    alert("Please fill required fields");
    return;
  }

  // توکن کاربر
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:3000/task/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
          title: name,
          description: desc,
          dueDate: date,
          dueTime: time,
        })
      }
    );

    const data = await response.json();

    console.log("SERVER RESPONSE:", data);

    if (response.ok) {
      alert("Task created successfully!");

      // برگشت به dashboard
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Create task failed");
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
}