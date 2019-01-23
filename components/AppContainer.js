import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
} from 'react-vr';
import Space from './Space'
import Mars from './Mars'
import Moon from './Moon'

export default class AppContainer extends React.Component {

state={
  planet: "none"
}

  changePlanet = (planet) =>{
    this.setState({
      planet: planet
    })
  }

  showComponent = () =>{
    if(this.state.planet==="none"){
       return <Space changePlanet={this.changePlanet} />
    } else if(this.state.planet==="mars"){
      return <Mars changePlanet={this.changePlanet} />
    }else{
      return <Moon changePlanet={this.changePlanet} />
    }
  }

  render() {
    return (
      <View>
        {this.showComponent()}
      </View>
    );
  }
};
