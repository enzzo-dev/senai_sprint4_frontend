import {Component} from 'react';

import './Desejos.css'

class Desejos extends Component{
    constructor(props){
        super(props);
        this.state = {
            //variáveis/propriedades
            idDesejo : '',
            Descricao : '',
            DataCriacao : '',
            idUsuario : ''
        }
    }

    //Funções



    estadoDescricao = async (evento) => {

        await this.setState({ Descricao : evento.target.value})

        console.log(this.state.Descricao)

        evento.preventDefault();
    }

    //Cadastra de fato a modificação ao Banco de dados

    listar = () =>{

        fetch('http://localhost:5000/api/desejo/' + this.state.idUsuario,{

            method : "GET",
        })

        .then(resposta => resposta.json())

        .then(data => this.setState({ desejos : data }))

        .catch( (erro) => console.log(erro) )
    }

    cadastrar = async (event) => {

        event.preventDefault();
        
        fetch('http://localhost:5000/api/desejo', {

            method : 'POST',

            body : JSON.stringify({
                idUsuario : this.state.idUsuario,                   
                descricao : this.state.descricao,
                dataCriacao : this.state.dataCriacao
            }),

            headers : {
                "Content-Type" : "application/json"
            },
        })

            .then(console.log("Desejo cadastrado!"))

            .catch(erro => console.log(erro))

            .then(this.listar)        
    }

    excluir = (id) => {
        
        fetch('http://localhost:5000/api/desejo/' + id.idDesejo, {

            method : 'DELETE'
        })

        .then(console.log('Deletando informação solicitada!'))

        .catch(erro => console.log(erro))

        .then(this.listar)
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

                        <form onSubmit={this.cadastrar}>
                            <input type="text" value={this.state.Descricao} 
                            onChange={this.estadoDescricao}
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
