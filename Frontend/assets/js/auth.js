const API_BASE = "http://localhost:5000/api/auth";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Login Submit
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value; // fixed input name
    const password = loginForm.password.value;

    const res = await fetch(`${API_BASE}/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


    const data = await res.json();
    if (res.ok) {
      alert("Login success!");
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.msg || "Login failed.");
    }
  });

  // Signup Submit
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = signupForm.firstName.value;
    const lastName = signupForm.lastName.value;
    const email = signupForm.email.value;
    const phone = signupForm.phone.value;
    const dob = signupForm.dob.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm.confirmPassword.value;

    if (password !== confirmPassword) return alert("Passwords do not match");

    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, dob, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.msg || "Signup failed.");
    }
  });
});
