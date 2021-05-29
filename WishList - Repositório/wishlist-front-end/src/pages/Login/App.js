import {Component } from 'react';

import './App.css';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      //Váriaveis/componentes
      idUsuario : '',
      Email : '',
      Senha : '',
      Desejos : []
    }
  }

  email = async (login) =>{
    await this.setState({ Email : login.target.value})

    console.log(this.state.Email)

    login.preventDefault();
  }

  senha = async (login) =>{
    await this.setState({ Senha : login.target.value})

    console.log(this.state.Senha)
  
    login.preventDefault();
  }    


  Logar = ( e) => {
    console.log('Agora iremos consumir a API');

    //Fetch é utilizado para consumirmos a API
    fetch('http://localhost:5000/api/login', {

        //Define o método de requisição
        method : 'POST',

        //Converte o state para uma string JSON
          body : JSON.stringify({
            email : this.state.Email, 
            senha : this.state.Senha
          }),

        headers : {
          "Content-Type" : "application/json"
        }

        

    })

    .then(resposta => resposta.json())

    .then(dado => this.setState({usuario : dado}))

    .catch(error => console.log(error))

    e.preventDefault()

  }

  componentDidMount(){
    //vai acontecer quando abrir a página
  }   

  render(){
    return(
      <div className="App">
      <div className="box-login">
        <h2>Login</h2>
        <form className="form-login" onSubmit={this.Logar}>

          <input onChange={this.email} value={this.state.Email} type="email" placeholder="Digite seu email" required></input>

          <input onChange={this.senha}  value={this.state.Senha} type="password" placeholder="Digite sua senha" required></input>

          <button type="submit">Conectar</button>
        </form>
      </div>
    </div>
    );
  }
}


export default Login;
