import React, {Component} from 'react'
import './App.css';

function DataFormat(props){
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
}

 class Relogio extends Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    }
  }

  componentDidMount(){
    this.timer = setInterval( () => {
      this.thick()
    }, 1000)

    console.log("Eu sou o relógio " + this.timer) 
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  thick(){
    this.setState({date : new Date()})
  }

  stop(){
    clearInterval(this.timer)
    console.log("O Relógio "  + this.timer +  " foi pausado!")
  }

  continue(){
    this.timer = setInterval( () => {
      this.thick()
    }, 1000)
    console.log('Relógio' + this.timer + 'retomado!')
  }

  render(){
    return(
      <div>
        <h1>Relógio</h1>
        <DataFormat date={this.state.date} />
        <div className="buttons">
          <button className="btnPausar" onClick={() => {this.stop()}}>Pausar</button>
          <button className="btnContinuar" onClick={() => {this.continue()}}>Retormar</button>
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Relogio />
        <Relogio />
      </header>
    </div>
  );
}

export default App;

