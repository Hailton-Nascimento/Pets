import { recuperCep } from "../js/validacao.js";
import { clienteService } from "../service/clienteService.js";



(async() =>{
    const id = new URL(window.location)
    .searchParams.get('id');

var inputNome = document.querySelector('[data-tipo="nome"]');
var inputEmail = document.querySelector('[data-tipo="email"]');
var inputDataNascimento = document.querySelector('[data-tipo="dataNascimento"]');
var inputCPF = document.querySelector('[data-tipo="cpf"]');
var inputCEP = document.querySelector('[data-tipo="cep"]');



try {
    const dados =  await clienteService.detalhaCliente(id)
  
    inputNome.value = dados.nome;
    inputEmail.value = dados.email;
    inputDataNascimento.value = dados.dataNascimento;
    inputCPF.value = dados.cpf;
    inputCEP.value = dados.cep;
    inputNome.focus();
    recuperCep(inputCEP);
    
    
} catch (error) {
    console.log(error);
    window.location.href = "../telas/erro.html";
}

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit',async (evento)=>{
    evento.preventDefault();
    try {
        await clienteService.atualizaCliente(inputNome.value,inputEmail.value, id)
        window.location.href="../telas/edicao_concluida.html"
        
    } catch (error) {
        console.log(error);
        window.location.href = "../telas/erro.html";
    }
   

})

})();