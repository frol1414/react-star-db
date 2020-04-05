import React, { Component } from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import PeoplePage from "../people-page/people-page";

import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";

export default class App extends Component {
  
  state = {
    showRandomPlanet: true,
    hasError: false,
  };
  
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  
  
  
  componentDidCatch() {
    this.setState({hasError: true});
  }
  
  render() {
    
    if(this.state.hasError) {
      return <ErrorIndicator/>
    }
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;
    
    return (
      <div className="stardb-app">
        <Header />
        { planet }
        
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
  
        <PeoplePage />
      </div>
    );
  }
}