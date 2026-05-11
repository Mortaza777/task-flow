const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem("registered", "true");

      alert("Register successful!");
      window.location.href = "login.html";

    } else {
      alert(data.message || "Register failed");
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
});