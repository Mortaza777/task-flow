function updateTime() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  document.getElementById('live-time').textContent =
    (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
}
updateTime();
setInterval(updateTime, 1000);

function togglePass(id, icon) {
  const input = document.getElementById(id);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  icon.style.stroke = isHidden ? 'rgba(108,143,255,0.8)' : 'rgba(255,255,255,0.3)';
}

const params = new URLSearchParams(window.location.search);

const token = params.get("token");

console.log("TOKEN:", token);

async function resetPassword() {
  const newpassword = document.getElementById("new-pass").value.trim();
  const confirmpassword = document.getElementById("confirm-pass").value.trim();

  if (!newpassword) {
    alert("Please enter new password");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/auth/resetPassword",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          token: token,
          newpassword: newpassword,
          confirmPassword: confirmpassword
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Password reset successfully");

      window.location.href = "login.html"
    }
  } catch (error) {
    console.log(error)

    alert("Server error")
  }
}
