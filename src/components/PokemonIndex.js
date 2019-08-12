import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const BASE_URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      all: [],
      search: ""
    }
  }

  componentDidMount() {
    this.getPokemon()
  }

  getPokemon = () => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ all: data, save: data })
      })
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

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={(e) => this.searchPokemon(e)} showNoResults={false} />
        <br />
        <PokemonCollection all={this.state.all} />
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
