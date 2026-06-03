function adicionarLinha() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    
    const mensagemDiv = document.getElementById('mensagem');
    
    // Validar se todos os campos estão preenchidos
    if (!nome || !email || !telefone) {
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.textContent = '⚠️ Todos os campos devem ser preenchidos!';
        return;
    }
    
    // Limpar mensagem de erro
    mensagemDiv.textContent = '';
    
    // Adicionar linha à tabela
    const tabela = document.getElementById('tabelaCorpo');
    const novaLinha = document.createElement('tr');
    
    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${telefone}</td>
        <td><button class="btn-remover" onclick="removerLinha(this)">Remover</button></td>
    `;
    
    tabela.appendChild(novaLinha);
    
    // Limpar formulário
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
}

function removerLinha(botao) {
    botao.parentElement.parentElement.remove();
}

function validarTabela() {
    const tabela = document.getElementById('tabelaCorpo');
    const linhas = tabela.getElementsByTagName('tr');
    const mensagemDiv = document.getElementById('mensagem');
    
    // Verificar se a tabela está vazia
    if (linhas.length === 0) {
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.textContent = '❌ A tabela está vazia! Adicione pelo menos uma linha.';
        return;
    }
    
    // Verificar se todas as células estão preenchidas
    let tabelaCompleta = true;
    
    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName('td');
        
        // Pega os primeiros 3 td (ignorando o botão de remover)
        for (let j = 0; j < 3; j++) {
            if (!celulas[j].textContent.trim()) {
                tabelaCompleta = false;
                break;
            }
        }
        
        if (!tabelaCompleta) break;
    }
    
    if (!tabelaCompleta) {
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.textContent = '❌ A tabela não está completamente preenchida! Verifique todos os campos.';
    } else {
        mensagemDiv.className = 'mensagem sucesso';
        mensagemDiv.textContent = '✅ Tabela validada com sucesso!';
    }
}