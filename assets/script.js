document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");

  // Lógica para página de registro
  if (form && window.location.pathname.includes("registrar")) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      console.log("Enviando dados...");

      if (!name || !email || !password || !confirmPassword) {
        alert("Preencha todos os campos.");
        return;
      }

      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      try {
        const res = await fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, confirmPassword }),
        });

        const text = await res.text();
        console.log("Resposta do servidor:", text);

        if (res.ok) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "index.html";
        } else {
          alert(text);
        }
      } catch (err) {
        alert("Erro ao conectar com o servidor.");
        console.error(err);
      }
    });
  }

  // Lógica para página de login
  if (form && window.location.pathname.includes("index")) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Fazendo login...");

      if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
      }

      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const text = await res.text();
        console.log("Resposta do servidor:", text);

        if (res.ok) {
          alert("Você está logado!");
          // Aqui você pode redirecionar para uma página de dashboard ou home
          // window.location.href = "dashboard.html";
        } else {
          alert(text);
        }
      } catch (err) {
        alert("Erro ao conectar com o servidor.");
        console.error(err);
      }
    });
  }

  // Lógica do tema escuro
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    // Carrega o tema salvo
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
      toggle.checked = true;
    }

    // Event listener para mudança de tema
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark);
    });
  }
});