import { valida } from './validacao.js'

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {

    $(document).ready(function(){
        $('#cep').mask('00000-000');
        $('#cpf').mask('000.000.000-00');
        $('#preco').mask('000.000.000.000.000,00', {reverse: true});
    });
    

//     if(input.dataset.tipo==='preco'){

//         SimpleMaskMoney.setMask(input,{
//                 prefix: 'R$: ',
//                 fixed: true,
//                 fractionDigits: 2,
//                 decimalSeparator: ',',
//                 thousandsSeparator: '.',
//                 cursor: 'end'
//         })
               
//    }

    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})
