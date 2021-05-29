import {Component } from 'react';

import './App.css';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      //Váriaveis/componentes
      idUsuario : 0,
      Email : '',
      Senha : '',
      isLogged : false,
      hasLoginError: false,
    }
  }

  atualizarEmail = async (evento) => {

    await this.setState({ Email : evento.target.value})

    console.log(this.state.Email)

    evento.preventDefault();
}

atualizarSenha = async (event) => {

  await this.setState({ Senha : event.target.value})

  console.log(this.state.Senha)

  event.preventDefault();
}

  Logar = () => {
    console.log('Agora iremos consumir a API');

    //Fetch é utilizado para consumirmos a API
    fetch('http://localhost:5000/api/login', {
        //Define o método de requisição
        method : 'POST',
        //Converte o state para uma string JSON
        body : JSON.stringify({
          Email : this.state.Email, 
          Senha : this.state.Senha
        }),

        headers : {
          "Content-Type" : "application/json"
        }

        .catch(error => console.log(error))
    })

    .then(response => {

      if (response.status === 200) {
        this.setState({teste : response.json()})
        this.setState({isLogged : true})
      }

    })

    .then(() => console.log(this.state.idUsuario))
    .then(() => console.log(this.state.isLogged))


    //com o fetch, temos uma resposta de PROMESS

    //Define o tipo de retorno, no caso JSON
    .then(resposta => resposta.json())

    //e atualiza o state com os dados informados e vindos da API
    .then(data => this.setState({Email : data, Senha : data}))

    //Caso ocorra algum erro, ele mostrará no console
    .catch((erro) => console.log(erro))



  }

  componentDidMount(){
    //vai acontecer quando abrir a página
  }

  render(){
    return(
      <div className="App">
      <div className="box-login">
        <h2>Login</h2>
        <form className="form-login" onSubmit={this.state.Logar}>

          <input onChange={this.atualizarEmail} value={this.state.Email} type="email" placeholder="Digite seu email"></input>

          <input  onChange={this.atualizarSenha} value={this.state.Senha} type="password" placeholder="Digite sua senha"></input>

          <button type="submit">Conectar</button>
        </form>
      </div>
    </div>
    );
  }
}


export default Login;
