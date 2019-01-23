import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';
import AppContainer from './components/AppContainer'

export default class ExploreTheSpace extends React.Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
};

AppRegistry.registerComponent('ExploreTheSpace', () => ExploreTheSpace);
