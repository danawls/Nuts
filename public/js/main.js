// main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Nuts website is ready!");
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const editProfileBtn = document.getElementById("edit-profile-btn");
  const editProfileForm = document.getElementById("edit-profile-form");

  if (editProfileBtn && editProfileForm) {
    editProfileBtn.addEventListener("click", () => {
      editProfileForm.style.display = "block";
      editProfileBtn.style.display = "none";
    });
  }
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector('a[href="/logout"]');

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // 로그아웃 처리 로직을 여기에 추가
      window.location.href = "/";
    });
  }
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchResults = document.getElementById("research-results");
  const newProjectBtn = document.getElementById("new-project-btn");
  const projectList = document.getElementById("project-list");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search-query").value;
      // 검색 기능 구현 (백엔드 연동 시 확장)
      searchResults.innerHTML = `<p>Searching for "${query}"...</p>`;
    });
  }

  if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {
      // 새로운 프로젝트 생성 기능 구현 (백엔드 연동 시 확장)
      projectList.innerHTML =
        "<p>New project created! (This is a placeholder)</p>";
    });
  }
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/profile";
        } else {
          alert("Signup failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Signup failed");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/profile";
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed");
      }
    });
  }
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const profileForm = document.getElementById("edit-profile-form");

  if (token && profileForm) {
    fetch("/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("username").value = data.username;
        document.getElementById("email").value = data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to load profile");
      });

    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (data.error) {
          alert("Update failed");
        } else {
          alert("Profile updated successfully");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Update failed");
      }
    });
  }
});

// main.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const researchForm = document.getElementById("new-research-form");
  const projectForm = document.getElementById("new-project-form");

  if (token && researchForm) {
    researchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;

      try {
        const response = await fetch("/api/research", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        });
        const data = await response.json();
        if (data.error) {
          alert("Failed to create research");
        } else {
          alert("Research created successfully");
          // 새로고침하거나 목록을 업데이트
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create research");
      }
    });
  }

  if (token && projectForm) {
    projectForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("project-title").value;
      const description = document.getElementById("project-description").value;

      try {
        const response = await fetch("/api/development", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        });
        const data = await response.json();
        if (data.error) {
          alert("Failed to create project");
        } else {
          alert("Project created successfully");
          // 새로고침하거나 목록을 업데이트
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create project");
      }
    });
  }
});
