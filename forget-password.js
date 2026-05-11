function updateTime() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  document.getElementById('live-time').textContent =
    (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
}
updateTime();
setInterval(updateTime, 1000);

async function sendResetToken() {
  const email = document.getElementById("email-input").value.trim();

  if (!email) {
    alert("Please enter ypur email");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/forgetPassword",
      {
        method: "POST",

        headers: {
          "Content-type": "application/json"
        },

        body: JSON.stringify({
          email: email,
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      alert("Check your email for password reset instructions.")
      const token = data.resetToken;

      window.location.href = `new-password.html?token=${token}`;
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    alert("sercer error")
  }
}