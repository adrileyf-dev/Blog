document.addEventListener("DOMContentLoaded", function() {
    
    // Validação do formulário de exclusão antes do envio
    document.getElementById("deleteForm")?.addEventListener("submit", function(event) {
        const confirmacao = confirm("Tem certeza de que deseja excluir este artigo? Esta ação não pode ser desfeita.");
        if (!confirmacao) {
            event.preventDefault(); // Impede o envio do formulário se o usuário cancelar
        }
    });

    // Validação básica para inputs vazios antes do envio do formulário de edição
    const editForm = document.getElementById("editForm");
    if (editForm) {
        editForm.addEventListener("submit", function(event) {
            const categoria = document.getElementById("categoria").value.trim();
            const dataCadastro = document.getElementById("data").value.trim();

            if (categoria === "" || dataCadastro === "") {
                alert("Todos os campos são obrigatórios.");
                event.preventDefault(); // Impede o envio se houver campos vazios
            }
        });
    }

       // Função para confirmar exclusão e abrir o modal
    window.confirmExclusion = function(id) {
        document.getElementById("deleteForm").action = `/articles/delete/${id}`;
        $('#deleteModal').modal('show');
    };
});
