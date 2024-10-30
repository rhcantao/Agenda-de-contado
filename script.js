const listaContatos = document.getElementById('lista-contatos');
const btnCadastrar = document.getElementById('cadastrar');
const btnOrdenar = document.getElementById('ordenar');

btnCadastrar.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && sobrenome && telefone) {
        adicionarContato(nome, sobrenome, telefone);
        limparFormulario();
    } else {
        alert('Preencha todos os campos!');
    }
});

function adicionarContato(nome, sobrenome, telefone) {
    const contato = document.createElement('div');
    contato.innerHTML = `
        <span>${nome} ${sobrenome} - Telefone: ${telefone}</span>
        <button onclick="removerContato(this)">Remove</button>
        <button onclick="editarContato(this)">Editar</button>
        <button onclick="enviarMensagem('${nome}', '${sobrenome}', '${telefone}')">Enviar Mensagem</button>
    `;
    listaContatos.appendChild(contato);
}

function removerContato(elemento) {
    elemento.parentElement.remove();
}

function editarContato(elemento) {
    const contato = elemento.parentElement;
    const partes = contato.querySelector('span').textContent.split(' - Telefone: ');
    const [nomeCompleto, telefone] = partes;
    const [nome, sobrenome] = nomeCompleto.split(' ');

    document.getElementById('nome').value = nome;
    document.getElementById('sobrenome').value = sobrenome;
    document.getElementById('telefone').value = telefone;

    contato.remove();
}

function enviarMensagem(nome, sobrenome, telefone) {
    const mensagem = `Olá, ${nome} ${sobrenome}, esse número é seu?`; // Mensagem personalizada
     // Remove caracteres não numéricos e garante que o número tenha 11 dígitos
     const numeroFormatado = telefone.replace(/[^\d]/g, '').slice(-11); 

    const url = `https://web.whatsapp.com/send?phone=${numeroFormatado}&text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank'); // Abre o WhatsApp Web em uma nova aba
}

btnOrdenar.addEventListener('click', () => {
    const contatos = Array.from(listaContatos.children);

    contatos.sort((a, b) => {
        const nomeA = a.querySelector('span').textContent.split(' ')[0].toLowerCase();
        const nomeB = b.querySelector('span').textContent.split(' ')[0].toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    listaContatos.innerHTML = '';
    contatos.forEach(contato => listaContatos.appendChild(contato));
});

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('telefone').value = '';
}
