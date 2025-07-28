document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");

  // Função para simular servidor se estiver fora do ar
  async function makeRequest(url, data) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.status === 500) {
        throw new Error("Servidor temporariamente indisponível");
      }
      
      return res;
    } catch (error) {
      // Se der erro no servidor, usar localStorage
      console.log("Usando modo offline:", error.message);
      return null;
    }
  }

  // Lógica para página de registro
  if (form && window.location.pathname.includes("registrar")) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!name || !email || !password || !confirmPassword) {
        alert("Preencha todos os campos.");
        return;
      }

      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      // Tentar usar o servidor primeiro
      const res = await makeRequest("/register", { name, email, password, confirmPassword });
      
      if (res && res.ok) {
        // Servidor funcionando
        const text = await res.text();
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
      } else if (res && !res.ok) {
        // Servidor funcionando mas deu erro
        const text = await res.text();
        alert(text);
      } else {
        // Servidor fora do ar - usar localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find(user => user.email === email)) {
          alert("Este email já está cadastrado.");
          return;
        }
        
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Cadastro realizado com sucesso! (modo offline)");
        window.location.href = "index.html";
      }
    });
  }

  // Lógica para página de login
  if (form && window.location.pathname.includes("index")) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
      }

      // Tentar usar o servidor primeiro
      const res = await makeRequest("/login", { email, password });
      
      if (res && res.ok) {
        // Servidor funcionando
        alert("Você está logado!");
      } else if (res && !res.ok) {
        // Servidor funcionando mas deu erro
        const text = await res.text();
        alert(text);
      } else {
        // Servidor fora do ar - usar localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          alert("Você está logado! (modo offline)");
        } else {
          alert("Email ou senha inválidos.");
        }
      }
    });
  }

  // Lógica do tema escuro
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark);
    });
  }
});
