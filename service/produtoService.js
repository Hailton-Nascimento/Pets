
const listaProdutos = () => {
    return fetch('http://localhost:3000/produtos')
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error('Não foi possivel listar Produtos.');
  
      })
  }
  
  
  const criaProdutos = (nome, preco, descricao) => {
  
    return fetch(`http://localhost:3000/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // APPLICATION É COM DOIS P's
      },
      body: JSON.stringify({
        nome: nome,
        preco: preco,
        descricao: descricao  
      })
    })
    .then(resposta => {
      if (resposta.ok) {
        return resposta.body;;
      }
      throw new Error('Não foi possivel Criar um Produto.');
  
    })
  }
  
  
  const removeProduto = (id) => {
    console.log("passou aqui no remove produto")
    return fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'DELETE'
    })
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error('Não foi possivel Excluir o Produto!');
      }
    })
  }
  
  const detalhaProduto = (id) => {
    return fetch(`http://localhost:3000/produtos/${id}`)
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error('Não foi possivel detalhar Produto!');
    
      })
  
  }
  const atualizaProduto = (nome, preco,descricao, id) => {
    console.log(nome, id)
    return fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        preco: preco,
        descricao:descricao
      })
    })
      .then(resposta => {
        if (resposta.ok) {
          return resposta.body;;
        }
        throw new Error('Não foi possivel atualizar um Produto!');
    
      })
  }
  
  

  export const produtoService = {
    listaProdutos,
    criaProdutos,
    removeProduto,
    detalhaProduto,
    atualizaProduto
  }
  
  