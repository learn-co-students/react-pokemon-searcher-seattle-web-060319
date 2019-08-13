import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      image: this.props.pokemon.sprites.front
    })
  }

  togglePokemon = () => {
    if(this.state.image === this.props.pokemon.sprites.front) {
      this.setState({
        image: this.props.pokemon.sprites.back,
      });
    } else {
      this.setState({
        image: this.props.pokemon.sprites.front,
      });
    }
  };
  //if clicked, show opposite, this.state = true?
  render() {
    return (
      <Card onClick={this.togglePokemon}>
        <div>
          <div className="image">
            <img alt="oh no!" src={this.state.image}/>
        </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === "hp").value} hp
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
