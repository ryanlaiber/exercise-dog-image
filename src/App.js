import React from 'react';
import './App.css';
import Main from './components/Main';

class App extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
    this.guardaRaca = this.guardaRaca.bind(this);
    this.loadingAction = this.loadingAction.bind(this);
    this.state = {
      imgPath: '',
      flag: false,
      previousPath: '',
    };
  }

  async fetchApi() {
    const { imgPath } = this.state;
    this.setState({
      flag:false,
      previousPath: imgPath,
    });
    const apiFetch = await fetch('https://dog.ceo/api/breeds/image/random');
    const apiObj = await apiFetch.json();
    this.setState({
      imgPath: apiObj.message,
      flag: true,
    });
  }

  guardaRaca() {
    const { imgPath, previousPath } = this.state;
    const race = imgPath.split('/')[4];
    if(race) { alert(`esse foi o ${race}! muito bonito, né??`) };
    if (localStorage.dogUrl) {
      localStorage.dogUrl = previousPath;
    } else{
      localStorage.setItem('dogUrl', imgPath);
    }
  }

  componentDidMount() {
    console.log('montou');
    this.fetchApi();
  }

  shouldComponentUpdate(nextProps, NextState) {
    console.log('verifica update');
    const eleMesmo = NextState.imgPath.includes('terrier');
    if (eleMesmo) {alert('Terriers odeiam tirar fotos!!')};
    const sim = eleMesmo ? false : true;
    return sim;
  }

  componentDidUpdate() {
    console.log('atualizou');
  }

  loadingAction() {
    this.guardaRaca();
    return (<h3>Loading...</h3>);
  }

  render(){
    const { imgPath, flag } = this.state;
    return (
      <div className="App">
        { (flag) ? <Main imgPath={ imgPath } /> : this.loadingAction() }
        <button onClick={() => this.fetchApi()} >Atualizar</button>
      </div>
    );
  }
}

export default App;
