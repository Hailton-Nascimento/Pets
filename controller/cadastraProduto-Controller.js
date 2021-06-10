
import {produtoService} from '../service/produtoService.js'

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async(evento) => {
    evento.preventDefault();
    try {
        var nome = evento.target.querySelector('[data-tipo="nome"]').value;
        var preco = evento.target.querySelector('[data-tipo="preco"]').value;
        var descricao = evento.target.querySelector('[data-tipo="descricao"]').value;
       
    await produtoService.criaProdutos(nome, preco,descricao);
    window.location.href = '../telas/cadastro_produto_concluido.html';
          
    } 
    catch(error){
        console.log(error);
        window.location.href = '../telas/erro.html';
    }
            
})
