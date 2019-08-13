import React from 'react'
import PokemonCollection from './PokemonCollection';
import PokemonForm from './PokemonForm';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

const API = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
        pokemons: [],
        showPokemons: [],
      };
  }

  componentDidMount() {
    this.handleFetch();
  }

  frontOrBack = (card) => {
    let pokemon = this.state.pokemons
    let index = pokemon.indexOf(card)
    if (card.flipped) {
      card.flipped = false
    } else {
      card.flipped = true
    }
    pokemon[index]=card
    this.setState({
      pokemons: pokemon
    });
  };

  handleSubmit = (e) => {
    console.log('hi')
    e.persist()
    return fetch(API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name:e.target.name.value,
        stats: [{
          value: e.target.hp.value,
          name: 'hp'
        }],
        sprites: {
          front: e.target.frontUrl.value,
          back: e.target.backUrl.value
        }
      })
    })
    .then(res => res.json())
    .then(this.handleFetch())
  }

  searchPokemon = (e) => {
  this.setState({ search: e.target.value })
  this.filterPokemon()
}

filterPokemon = () => {
  this.setState(prevState => {
    let allPokemon = prevState.save
    let str = prevState.search
    let newPokemon = allPokemon.filter(pokemon => pokemon.name.includes(str))
    return { all: newPokemon }
  })
}

  handleFetch = () => {
    fetch(API)
    .then(res => res.json())
    .then(data => this.pokemonsInfo(data));
  };

  pokemonsInfo = (data) => {
    this.setState({
      pokemons: data,
    });
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection  handleSubmit={this.handleSubmit} frontOrBack={this.frontOrBack} pokemon={this.state.pokemons}/>
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default PokemonPage
