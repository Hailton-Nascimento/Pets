import { produtoService } from "../service/produtoService.js";



(async() =>{
    const id = new URL(window.location)
    .searchParams.get('id');

var inputNome = document.querySelector('[data-tipo="nome"]');
var inputPreco = document.querySelector('[data-tipo="preco"]');
var inputDescricao = document.querySelector('[data-tipo="descricao"]');


try {
    const dados =  await produtoService.detalhaProduto(id)
    inputNome.value = dados.nome;
    inputPreco.value = dados.preco;
    inputDescricao.value = dados.descricao;
    
} catch (error) {
    console.log(error);
    window.location.href = "../telas/erro.html";
}

const formulario = document.querySelector('[data-form]');


formulario.addEventListener('submit',async (evento)=>{
  
    evento.preventDefault();
    try {
        await produtoService.atualizaProduto(inputNome.value,inputPreco.value,inputDescricao.value, id)
        window.location.href="../telas/edicao_produto_concluida.html"
        
    } catch (error) {
        console.log(error);
        window.location.href = "../telas/erro.html";
    }
   

})

})();