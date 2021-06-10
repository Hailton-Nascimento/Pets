import { produtoService } from '../service/produtoService.js'


const criarNovaLinha = (produto) => {
    try {
        var tr = document.createElement('tr');

        tr.innerHTML =
            `<td class="td" data-td>${produto.nome}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.descricao}</td>
                    <td>
                        <ul class="tabela__botoes-controle">
                            <li><a href="../telas/edita_produto.html?id=${produto.id}" class="botao-simples botao-simples--editar">Editar</a></li>
                            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                        </ul>
                    </td>`
        tr.dataset.id = produto.id;
    
        return tr;
    } catch (error) {
        console.log(error);
        window.location.href = "../telas/erro.html";
    }
   

}

const tabela = document.querySelector('[data-tabela]');

tabela.addEventListener('click', async (evento) => {

    if (evento.target.className == 'botao-simples botao-simples--excluir') {
        try {
            await produtoService.removeProduto(evento.target.closest('[data-id]').dataset.id)
            evento.target.closest('[data-id]').remove();
        } catch (error) {
            console.log(error);
            window.location.href = "../telas/erro.html";
        }
    }
})

const render = async () => {

    try {
        const listaProdutos = await produtoService.listaProdutos()
        listaProdutos.forEach(produto => {
            tabela.appendChild(criarNovaLinha(produto));
        })
    } catch (error) {
        console.log(error);
        window.location.href = "../telas/erro.html";
    }

}


render();
