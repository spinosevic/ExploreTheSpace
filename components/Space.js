import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  VrButton,
  AmbientLight,
  PointLight,
  Animated,
  StyleSheet
} from 'react-vr';
const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class Space extends React.Component {
  state = {
   rotation: new Animated.Value(0),

 }
 componentDidMount() {
  this.rotate();
}

 rotate = () => {
  this.state.rotation.setValue(0);
  Animated.timing(
    this.state.rotation,
    {
      toValue: 360,
      duration: 10000,
    }
  ).start(this.rotate);
}

  render() {
    return (
      <View >
        <Pano source={asset('space.jpg')}/>
        <AmbientLight intensity={0.5} />
        <PointLight
  style={{
    color:'white', transform:[{translate:[0, 0, 0]}]
  }}
/>
        <View  >
        <VrButton onClick={()=>{this.props.changePlanet("moon")}}>
        <AnimatedModel
        lit={true}

        source={{
          obj: asset('Moon.obj')
        }}
        texture={asset(`Moon.png`)}
        style={{
          transform: [
            {translate: [-25, -20, -80]},
            {rotateY: this.state.rotation}

          ]
        }} />
        </VrButton>

              <Text
                   style={styles.moonText}>
                   Moon
             </Text>
            </View>
            <View>
            <VrButton onClick={()=>{this.props.changePlanet("mars")}}>
              <AnimatedModel
              lit={true}
              source={{
                obj: asset('Mars.obj')
              }}
              texture={asset(`Mars.png`)}
              style={{
                transform: [
                  {translate: [25, -20, -80]},
                  {rotateY: this.state.rotation}
                ]
              }} />
            </VrButton>
        <Text
             style={styles.marsText}>
             Mars
       </Text>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  marsText:{
      fontSize: 0.4,
      fontWeight: '400',
      layoutOrigin: [1.25, 2.5],
      paddingLeft: 0.2,
      paddingRight: 0.2,
      textAlign: 'center',
      textAlignVertical: 'center',
      transform: [{translate: [2, 0.5, -3]}],

  },
  moonText:{
    fontSize: 0.4,
    fontWeight: '400',
    layoutOrigin: [1.25, 2.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [{translate: [0, 0, -3]},
   ],
 },

})
