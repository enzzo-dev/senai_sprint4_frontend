import {Component } from 'react';
import axios from 'axios';
import {parseJwt} from '../../services/auth';


import './App.css';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      //Váriaveis/componentes
      email : '',
      senha : '',
      erroMensagem : '',
      isLoading : false
    }
  }


  atualizarCampos = (campo) => {
    this.setState({ [campo.target.name] : campo.target.value })
  } 

  Logar = (event) => {

    event.preventDefault()

    this.setState({erroMensagem : '', isLoading : true})

    axios.post("http://localhost:5000/api/login", {
      email : this.state.email,
      senha : this.state.senha
    })

    .then(resposta => {
      if(resposta.status === 200)
      {
        localStorage.setItem("usuario-login", resposta.data.token);

        console.log('Meu token é: ' + resposta.data.token);

        this.setState({isLoading : false});

        // let base64 = localStorage.getItem('usuario-login').split('.')[1];

        // console.log(JSON.parse(window.atob(base64)))

        console.log(parseJwt().role)

        if(parseJwt().role !== "")
        {
          this.props.history.push('/desejos')
        }
      }
    })

    .catch( () => {
      
      this.setState({erroMensagem : 'Email ou Senha incorretos! Tente novamente', isLoading : false}) 

    
  })
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

          <input name="email" onChange={this.atualizarCampos} value={this.state.email} type="email" placeholder="Digite seu email" required></input>

          <input name="senha" onChange={this.atualizarCampos}  value={this.state.senha} type="password" placeholder="Digite sua senha" required></input>
          <p className="erro">{this.state.erroMensagem}</p>

          <button  type="submit">Conectar</button>
        </form>
      </div>
    </div>
    );
  }
}


export default Login;
