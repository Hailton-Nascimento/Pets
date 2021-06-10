
import {clienteService} from '../service/clienteService.js'

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async(evento) => {
    console.log("passou aqui em cadastra cliente")
    evento.preventDefault();
    try {
        var nome = evento.target.querySelector('[data-tipo="nome"]').value;
        var email = evento.target.querySelector('[data-tipo="email"]').value;
        var dataNascimento = evento.target.querySelector('[data-tipo="dataNascimento"]').value;
        var cpf = evento.target.querySelector('[data-tipo="cpf"]').value;
        var cep = evento.target.querySelector('[data-tipo="cep"]').value;

     console.log(nome, email, dataNascimento,cpf,cep)

    await clienteService.criaCliente(nome, email, dataNascimento,cpf,cep);
    window.location.href = '../telas/cadastro_concluido.html';
          
    } 
    catch(error){
        console.log(error);
        window.location.href = '../telas/erro.html';
    }
            
})
