import React, { Component } from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import PeoplePage from "../people-page/people-page";

import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
  
  swapiService = new SwapiService();
  
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
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPlanets}
            renderItem={(item) => item.name}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllStarships}
            renderItem={(item) => item.name}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        
      </div>
    );
  }
}