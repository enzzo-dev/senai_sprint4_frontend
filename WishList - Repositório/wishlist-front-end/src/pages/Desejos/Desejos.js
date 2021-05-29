import {Component} from 'react';

import './Desejos.css'

class Desejos extends Component{
    constructor(props){
        super(props);
        this.state = {
            //variáveis/propriedades
            idDesejo : '',
            Descricao : '',
            DataCriacao : Date,
            idUsuario : ''
        }
    }

    //Funções

    Desejos = () => {

        fetch("http://localhost:5000/api/desejos", {
            method : 'GET'
        })


        .then(respostaDesejo => respostaDesejo.json())

        // .then(dados => this.setState(idDesejo : dados))

        .catch((erro) => console.log(erro))
    }

    //Atualiza somente o state
    atualizaEstadoDescricao = async (evento) => {

        await this.setState({ Descricao : evento.target.value})

        console.log(this.state.Descricao)

        evento.preventDefault();
    }

    //Cadastra de fato a modificação ao Banco de dados
    cadastrarDesejo = (event) => {
        //Ignora o comportamento padrão do navegador - Não atualiza

        event.preventDefault();

        fetch('http://localhost:5000/api/desejos', {
            method : 'POST',

            body : JSON.stringify({Descricao : this.state.Descricao}),

            headers : {
                "Content-Type" : "application/json"
            }

        })

        .then(console.log("Desejo cadastrado"))

        .catch(error => console.log(error))

    }



    //Funções

    componentDidMount(){

    }

    render(){
        return(
            <main>
                <section className="novoDesejo">
                    <div className="InserirDesejo">
                        {/*Cadastrar novo desejo */}
                        <h2>Insira um novo desejo!</h2>

                        <form onSubmit={this.cadastrarDesejo}>
                            <input type="text" value={this.state.Descricao} 
                            onChange={this.atualizaEstadoDescricao}
                            placeholder="Insira o seu próximo sonho a ser realizado">    
                            </input>
                            <button type="submit">Cadastrar</button>
                        </form>                     
                    </div>
                </section>
                <aside className="ListaDeDesejos">

                </aside>
                
            </main>   
        )
    }

}

export default Desejos;
