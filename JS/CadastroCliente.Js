document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recarregar a página

        const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
        const contato = document.getElementById("telefone").value.replace(/\D/g, ""); // Remove caracteres não numéricos
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmSenha = document.getElementById("confirmSenha").value;
        const grupo = document.getElementById("grupo").value;

        if (senha !== confirmSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const employeeData = {
            name: nomeCompleto,
            phoneNumber: contato,
            email: email,
            password: senha,
            role: grupo
        };

        fetch("http://localhost:8083/employee/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar. Verifique os dados e tente novamente.");
            }
            return response.json();
        })
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "TelaCadastroFuncionario.html"; // Redireciona após cadastro
        })
        .catch(error => {
            alert(error.message);
        });
    });
});
