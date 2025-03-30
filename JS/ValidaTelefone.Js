document.addEventListener("DOMContentLoaded", function () {
    const telefoneInput = document.getElementById("telefone");

    // Função para aplicar a máscara no telefone
    function aplicarMascaraTelefone(event) {
        let valor = event.target.value;

        // Remover tudo que não seja número
        valor = valor.replace(/\D/g, "");
        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        // Adicionar a máscara (XX) XXXXX-XXXX
        if (valor.length <= 2) {
            valor = valor.replace(/(\d{2})/, "($1");
        } else if (valor.length <= 7) {
            valor = valor.replace(/(\d{2})(\d{5})/, "($1) $2");
        } else {
            valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }

        event.target.value = valor;
    }

    // Função para validar o telefone
    function validarTelefone() {
        const telefone = telefoneInput.value;
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;

        if (!regex.test(telefone)) {
            telefoneInput.classList.add("is-invalid");
            return false;
        } else {
            telefoneInput.classList.remove("is-invalid");
            return true;
        }
    }

    // Aplicar a máscara enquanto o usuário digita
    telefoneInput.addEventListener("input", aplicarMascaraTelefone);

    // Validar o telefone ao submeter o formulário
    const form = document.querySelector(".form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (validarTelefone()) {
            alert("Cadastro realizado com sucesso!");
            // Aqui você pode continuar com a submissão do formulário
        } else {
            alert("Por favor, insira um número de telefone válido.");
        }
    });
});
