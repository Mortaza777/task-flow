function updateTime() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  document.getElementById('live-time').textContent =
    (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
}
updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const nameEl = document.getElementById("profile-name")
  nameEl.textContent = user.username;

  const emailEl = document.getElementById("profile-email");
  emailEl.textContent = user.email;

  const avatar = document.getElementById("avatar-initials");
  avatar.textContent = user.username ? user.username.charAt(0).toUpperCase() : "?"
})

const logoutBtn = document.getElementById("log-out");

logoutBtn.addEventListener("click", () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe")

  window.location.href = "login.html";
})

const deleteBtn = document.getElementById("delete-account");

deleteBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");


  try {
    const response = await fetch(
      "http://localhost:3000/auth/delete-account",

      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const data = await response.json();

    if (response.ok) {
      alert("Account delete successfully");

      localStorage.clear();

      window.location.href = "register.html"
    } else {
      alert(data.message || "Delete faild")
    }
  } catch (error) {
    console.log(error)

    alert("Server error")
  }
})