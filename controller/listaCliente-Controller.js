import { clienteService } from '../service/clienteService.js'


const criarNovaLinha = (cliente) => {
    
    try {
        var tr = document.createElement('tr');
        tr.innerHTML =
            `<td class="td" data-td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <ul class="tabela__botoes-controle">
                            <li><a href="../telas/edita_cliente.html?id=${cliente.id}" class="botao-simples botao-simples--editar">Editar</a></li>
                            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                        </ul>
                    </td>`
        tr.dataset.id = cliente.id;
    
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
            await clienteService.removeCliente(evento.target.closest('[data-id]').dataset.id)
            evento.target.closest('[data-id]').remove();
        } catch (error) {
            console.log(error);
            window.location.href = "../telas/erro.html";
        }




    }
})

const render = async () => {

    try {
        const listaClientes = await clienteService.listaClientes()
        listaClientes.forEach(cliente => {
            tabela.appendChild(criarNovaLinha(cliente));
        })
    } catch (error) {
        console.log(error);
        window.location.href = "../telas/erro.html";
    }

}


render();
