import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state={
    clicked: false
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  frontOrBack = () => {
    return this.state.clicked ? this.props.pokemon.sprites.back : this.props.pokemon.sprites.front
  }

  render() {
    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            <img alt="oh no!" src={this.frontOrBack()} />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {
                this.props.pokemon.stats.find(stat => stat.name === "hp").value
              }
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard
