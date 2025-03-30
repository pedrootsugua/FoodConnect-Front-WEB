document.addEventListener("DOMContentLoaded", function () {
    const userId = 3; // ID fixo para o exemplo, pode ser dinâmico

    // Seleciona os campos do formulário
    const nomeCompleto = document.getElementById("nomeCompleto");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");
    const grupo = document.getElementById("grupo");
    const senha = document.getElementById("senha");
    const confirmSenha = document.getElementById("confirmSenha");
    const form = document.querySelector(".form");

    // Buscar e preencher os dados do usuário
    fetch(`http://localhost:8083/employee/user/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar os dados do usuário.");
            }
            return response.json();
        })
        .then(data => {
            nomeCompleto.value = data.name;
            email.value = data.email;
            telefone.value = data.phoneNumber;
            grupo.value = data.role;
        })
        .catch(error => {
            alert(error.message);
        });

    // Evento para salvar as alterações
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Verifica se as senhas coincidem, caso tenham sido preenchidas
        if (senha.value && senha.value !== confirmSenha.value) {
            alert("As senhas não coincidem!");
            return;
        }

        // Monta o objeto de atualização, sem enviar senha se estiver vazia
        const updatedData = {
            name: nomeCompleto.value.trim(),
            email: email.value.trim(),
            phoneNumber: telefone.value.replace(/\D/g, ""), // Remove caracteres não numéricos
            role: grupo.value
        };

        if (senha.value) {
            updatedData.password = senha.value;
        }

        // Enviar os dados atualizados
        fetch(`http://localhost:8083/employee/alter/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao atualizar os dados. Verifique as informações.");
            }
            return response.json();
        })
        .then(() => {
            alert("Dados atualizados com sucesso!");
            window.location.reload(); // Atualiza a página após salvar
        })
        .catch(error => {
            alert(error.message);
        });
    });
});
