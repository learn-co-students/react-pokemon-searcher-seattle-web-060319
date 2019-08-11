import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
const API = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  constructor () {
    super()
    this.state = {
      pokemons: [],
      showPokemons: []
    }
  }

  componentDidMount = () => {
    fetch(API)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        showPokemons: data,
        pokemons: data
      })
    })
  }

  handleSearch = (e) => {
    if (e.target.value) {
      const search = e.target.value
      const newPokemons = this.state.pokemons.filter(pokemon => 
        pokemon.name.includes(search)
      )
      this.setState({
        showPokemons: newPokemons
      })
    } else {
      this.setState({
        showPokemons: this.state.pokemons
      });
    }
  }
 
  handleSubmit1 = (newPokemon) => {
    console.log(newPokemon.frontUrl, newPokemon.hp);
    fetch(API, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'name': newPokemon.name,
        'stats': [{
          'name': 'hp',
          'value': parseInt(newPokemon.hp)
        }],
        'sprites':{
          'front': newPokemon.frontUrl,
          'back': newPokemon.backUrl}
      })
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        showPokemons: [...this.state.pokemons, json],
        pokemons: [...this.state.pokemons, json]
      });
    })
  }

  compare = (a, b) => {
    const A = a.name;
    const B = b.name;
    if (A > B) return 1;
    if (A < B) return -1; 
    return 0  
  }

  handleClick = () => {
    const newPokemons = this.state.pokemons.sort(this.compare);
    this.setState({
      showPokemons: newPokemons
    });
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <button onClick={this.handleClick}>sort by name</button>
        <br />
        <Search onSearchChange={this.handleSearch} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.showPokemons} />
        <br />
        <PokemonForm handleSubmit1={this.handleSubmit1} />
      </div>
    );
  }
}

export default PokemonPage
