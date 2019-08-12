import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    imgState: true
  }

  onToggleImg = () => {
    this.setState({ imgState: !this.state.imgState })
  }

  render() {
    let pokemon = this.props.pokemon
    let img
    this.state.imgState ? img = pokemon.sprites.front : img = pokemon.sprites.back

    return (
      <Card>
        <div>
          <div className="image" onClick={this.onToggleImg}>
            <img src={img} />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {pokemon.stats[5].value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
