
const listaClientes = () => {
  return fetch('http://localhost:3000/profile')
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error('Não foi possivel listar clientes');

    })
}


const criaCliente = (nome, email, dataNascimento,cpf,cep) => {

  return fetch(`http://localhost:3000/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // APPLICATION É COM DOIS P's
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      cpf: cpf,
      cep:cep

    })
  })
  .then(resposta => {
    if (resposta.ok) {
      return resposta.body;;
    }
    throw new Error('Não foi possivel Criar um cliente!');

  })
}


const removeCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: 'DELETE'
  })
  .then(resposta => {
    if (!resposta.ok) {
      throw new Error('Não foi possivel Excluir o cliente!');
    }
  })
}

const detalhaCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`)
    .then(resposta => {
      if (resposta.ok) {
        return resposta.json();
      }
      throw new Error('Não foi possivel detalhar cliente!');
  
    })

}
const atualizaCliente = (nome, email, id) => {
  console.log(nome, email, id)
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      email: email
    })
  })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body;;
      }
      throw new Error('Não foi possivel atualizar um cliente!');
  
    })
}




export const clienteService = {
  listaClientes,
  criaCliente,
  removeCliente,
  detalhaCliente,
  atualizaCliente
}

