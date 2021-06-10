export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }
}

const tipoDeErro = [
    'customError',
    'valueMissing',
    'typeMismatch',
    'patternMismatch'

]


const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo Email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento: {
        customError: 'Você deve ser maior que 18 anos para se cadastrar.',
        valueMissing: 'O campo data de nascimento não pode estar vazio.'
    },
    cpf: {
        customError: 'O CPF digitado não é válido.',
        valueMissing: 'O campo CPF não pode estar vazio.',
        patternMismatch: 'Seu CPF deve conter 11 digitos'
    },
    cep: {
        valueMissing: 'O campo CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possivel buscar o CEP..',
    },
    bairro: {
        valueMissing: 'O campo Bairro    não pode estar vazio.',
    },
    logradouro: {
        valueMissing: 'O campo Logradouro não pode estar vazio.',
    },
    cidade: {
        valueMissing: 'O campo Cidade não pode estar vazio.',
    },
    estado: {
        valueMissing: 'O campo Estado não pode estar vazio.',
    },
    preco:{
        valueMissing: 'O campo Preço não pode estar vazio.'
    },
    descricao:{
        valueMissing: 'O campo Descrição não pode estar vazio.'
    }
}
const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperCep(input)
}


function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';

    tipoDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro];

        }
    })

    return mensagem;
}

function validaDataNascimento(input) {

    const dataRecebida = new Date(input.value);

    let mensagem = ''

    if (!maiorQue18(dataRecebida) ) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
 
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual
}


function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';
    if (!checaCPFRepetido(cpfFormatado)||!checarEstruturaCpf(cpfFormatado) ){
        mensagem = 'O CPF digitado não é válido.';
    }
    checarEstruturaCpf(cpfFormatado);

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
    let cpfValido = true;

    if (cpf.match(/^(\d)\1{10}/g)) {//testa se o cpf é de numeros repetidos
        cpfValido = false;
    }
    return cpfValido;


    // outra forma de fazer
    // const valoresRepetidos =[
    //     '00000000000',
    //     '11111111111',
    //     '22222222222',
    //     '33333333333',
    //     '44444444444',
    //     '55555555555',
    //     '66666666666',
    //     '77777777777',
    //     '88888888888',
    //     '99999999999'
    //   ];


    // valoresRepetidos.forEach(valor =>{
    //     if(valor==cpf){
    //         cpfValido = false;
    //         console.log("CPF não é valido");
    //     }
    // })
    // return cpfValido;
}

function checarEstruturaCpf(cpf) {
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);
}

function checaDigitoVerificador(cpf, multiplicador) {

    if (multiplicador >= 12) {
        return true;
    }

    let soma = 0;
    let multiplicadorIncial = multiplicador;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for (let contador = 0; multiplicadorIncial > 1; multiplicadorIncial--) {
        soma += cpfSemDigitos[contador] * multiplicadorIncial;
        contador++;
    }
    if (digitoVerificador == confirmarDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }

}

function confirmarDigito(soma) {
    return 11 - (soma % 11);
}

export function recuperCep(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/JSON; charset=utf-8'
        }
    }

    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options)
            .then(
                respose => respose.json()
            )
            .then(
                data => {
                    if (data.erro) {
                        input.setCustomValidity('Não foi possivel buscar o CEP.');
                        return;
                    }
                    input.setCustomValidity(''),
                        preencheCamposComCEP(data);
                    return;
                }
            )
    }

}

function preencheCamposComCEP(data) {

    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');
    const bairro = document.querySelector('[data-tipo="bairro"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
    bairro.value = data.bairro;


}