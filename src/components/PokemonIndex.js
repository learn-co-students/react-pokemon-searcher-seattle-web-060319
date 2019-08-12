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
      all: []
    }
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        this.setState({ all: data })
      })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection all={this.state.all} />
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
