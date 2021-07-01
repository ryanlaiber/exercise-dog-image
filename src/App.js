import React from 'react';
import './App.css';
import Main from './components/Main';

class App extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
    this.guardaRaca = this.guardaRaca.bind(this);
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
    this.setState({
      imgPath: apiObj.message,
      flag: true,
    });
  }

  guardaRaca() {
    const { imgPath } = this.state;
    const race = imgPath.split('/')[4];
    console.log(race);
    if (localStorage.dogUrl) {
      console.log('entrei');
      localStorage['dogUrl'] = imgPath;
    } else{
      localStorage.setItem('dogUrl', imgPath);
    }
  }

  componentDidMount() {
    this.fetchApi();
  }

  shouldComponentUpdate(nextProps, NextState) {
    const eleMesmo = NextState.imgPath.includes('terrier');
    const sim = eleMesmo ? false : true;
    console.log('confere');
    return sim;  
  }

  componentDidUpdate() {
    this.guardaRaca();
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
