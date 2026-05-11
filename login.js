const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rememberMe: remember,
      }),
    });

    const data = await response.json();

    console.log("SERVER RESPONSE:", data);

    if (response.ok) {
      alert("Login successful!");

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("rememberMe", remember);

      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Login failed");
    }

  } catch (error) {
    console.log("FULL ERROR:", error);
    alert("Server error");
  }
});
