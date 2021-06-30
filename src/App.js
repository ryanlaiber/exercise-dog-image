import React from 'react';
import './App.css';
import Main from './components/Main';

class App extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
    this.state = {
      imgPath: '',
      flag: false,
    };
  }

  async fetchApi() {
    this.setState({
      flag:false,
    });
    const apiFetch = await fetch('https://dog.ceo/api/breeds/image/random');
    const apiObj = await apiFetch.json();
    console.log(apiObj.message);
    this.setState({
      imgPath: apiObj.message,
      flag: true,
    });
  }


  componentDidMount() {
    this.fetchApi();
  }

  componentDidUpdate() {
    
  }

  render(){
    const { imgPath, flag } = this.state;
    return (
      <div className="App">
        { (flag) ? <Main imgPath={ imgPath } /> : <h3>Loading...</h3> }
        <button onClick={() => this.fetchApi()} >Atualizar</button>
      </div>
    );
  }
}

export default App;
