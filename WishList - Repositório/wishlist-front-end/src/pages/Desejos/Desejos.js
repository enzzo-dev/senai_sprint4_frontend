import {Component} from 'react';

import './Desejos.css'

class Desejos extends Component{
    constructor(props){
        super(props);
        this.state = {
            //variáveis/propriedades
            listaDesejo : [],
            Descricao : '',
            idDesejoAlterado : 0,
            date : new Date(),
            dataCriacao : ''
        }
    }

    //Funções

    buscarDesejos = () => {

        console.log("Vamos realizar a chamada para a API")

        fetch('http://localhost:5000/api/desejo')

        .then(resposta => resposta.json())

        .then(data => this.setState({listaDesejo : data}))

        .catch( (erro) => console.log(erro) )
    }

    cadastrar = (event) => {
        //Ignora o comportamento padrão do navegador - Não atualiza
        event.preventDefault()
        //DAQUI PARA BAIXO É ATUALIZAR

        if (this.state.idDesejoAlterado !== 0) {
            //edita
            fetch('http://localhost:5000/api/desejo/' + this.state.idDesejoAlterado,
            {
                method : 'PUT',

                body : JSON.stringify( {Descricao : this.state.Descricao } ),

                headers : {

                    "Content-Type" : "application/json"
                }
            })
                .then(resposta => {
                    if(resposta.status === 200){
                        console.log(
                            'Desejo ' + this.state.idDesejoAlterado + 'atualizado'
                        )
                    }
                })


                .catch(erro => console.log(erro))

                .then(this.buscarDesejos)

                .then(this.limparCampos)
            

        } else {

            //let dataFormatada = (( this.state.date.getDate() )) + "/" + (( this.state.date.getMonth() )) + "/" + ((this.state.date.getUTCFullYear()))
            //DAQUI PARA BAIXO É CADASTRO
            fetch('http://localhost:5000/api/desejo', 
            {

            method : 'POST',

            body : JSON.stringify({Descricao : this.state.Descricao, dataCriacao : this.state.date}),

            headers : {
                "Content-Type" : "application/json"
            }

        })


            .then(console.log("Desejo cadastrado"))

            .catch(error => console.log(error))

            .then(this.buscarDesejos)

            .then(this.limparCampos)
        }

        

    }

    atualizarEstadoDescricao = async (evento) => {

        await this.setState({ Descricao : evento.target.value})

        console.log(this.state.Descricao)

        evento.preventDefault();
    }
    //Funções

    componentDidMount(){
        this.buscarDesejos()
    }

    buscarDesejoPorId =   async (Desejo) => {
         await this.setState( {
            idDesejoAlterado : Desejo.idDesejo,
            Descricao : Desejo.descricao
        }, () => {
            console.log('O desejo ' + Desejo.idDesejo + ' foi selecionado')
        })
    }

    excluirPorId = async(Desejo) => {
        console.log('O desejo ' + Desejo.idDesejo + 'foi selecionado')

        fetch('http://localhost:5000/api/desejo/'+ Desejo.idDesejo, {

            method : 'DELETE'
        })

        .then(resposta => {
            if(resposta === 204)
            {
               console.log('Desejo: '+ Desejo.idDesejo + ' foi deletado') 
            }
        })

        .catch(erro => console.log(erro))

        .then(this.buscarDesejos)

        .then(this.limparCampos)
    }   

    limparCampos = () => {
        this.setState({
            Descricao : '',
            idDesejoAlterado : 0
        })
    }    

    //If ternário
    // condição ? faça algo caso seja verdadeiro : faça algo caso seja falso

    render(){
        return(

            <main>
                <section className="novoDesejo">
                    <div className="InserirDesejo">
                        {/*Cadastrar novo desejo */}
                        <h2>Insira um novo desejo!</h2>

                        <form onSubmit={this.cadastrar}>
                            
                            <input type="text" value={this.state.Descricao} 
                            required
                            onChange={this.atualizarEstadoDescricao}
                            placeholder="Insira o seu próximo objetivo a ser alcançado!">    
                            </input>
                                <button disabled={this.state.Descricao === '' ? 'none' : '' } type="submit">
                                    {
                                        this.state.idDesejoAlterado === 0 ? 'Cadastrar' : 'Atualizar'
                                    }
                                </button>
                                <button disabled={this.state.Descricao === '' ? 'none' : ''} onClick={this.limparCampos}>Cancelar</button> 
                           
                            
                        </form>                     
                    </div>
                </section>    


                    <div className="listaDeDesejos">
                        <h2>Lista de desejos</h2>
                                {
                                    this.state.listaDesejo.map((Desejo) => {
                                        return(
                                            <div className="desejos" key={Desejo.idDesejo}>
                                                <p>{Desejo.descricao}</p>
                                                <p className="horaCriacao">{Desejo.dataCriacao}</p>
                                                <button className="editar" onClick={ () => this.buscarDesejoPorId(Desejo)}>Editar</button>
                                                <button className="apagar" onClick={ () => this.excluirPorId(Desejo)}>Apagar</button>
                                            </div>
                                        )
                                    })
                                }
                    </div>
                
                
            </main>   
        )
    }

}

export default Desejos;
