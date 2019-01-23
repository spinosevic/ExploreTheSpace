import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated,
  StyleSheet,
  VrButton,
  VideoPano,
  VideoControl,
  MediaPlayerState,
  Sound
} from 'react-vr';

export default class Mars extends React.Component {
  state={
    playerState: new MediaPlayerState({autoPlay: true, muted: true}),
    bounceValue: new Animated.Value(1),
    curiosity: "none",
    sun: false,
    Curiosity_Rover: false,
    red: false,
    wind: false,
    horizon: false,
    mountain: false,
    air: false,
    gravity: false,
    year: false,
    size: false,
    activeButton: null
  }

  bounce({value, initial, toValue, friction = 1.5}) {
    value.setValue(initial);

    Animated.spring(
      value,
      {
        toValue,
        friction,
      }
    ).start();
  }
  circularButton = (d,theta1,theta2,customFunction,arg,text,textScale,color=null) =>{
    const {activeButton} = this.state;
    const selected = activeButton === arg;
    const scale = selected ? this.state.bounceValue : 1;
    return <VrButton  billboarding={'on'} style={
    {position:'absolute',  transform: [{translate: [d*Math.sin(theta1*Math.PI/180),d*Math.sin(theta2*Math.PI/180),-d*Math.cos(theta1*Math.PI/180)*Math.cos(theta2*Math.PI/180)]}
    ]}} onClick={()=>customFunction(arg)}>
    {this.state[arg]?
      <Animated.View  style={[styles.Btn2, {
      transform: [{scale}]}]} >
        <Text
          billboarding={'on'}
          style={[styles.BtnLabel2, {
          transform: [{   scale: textScale  }]}]}>
            {curiosities[arg]}
         </Text>
         </ Animated.View>:
      <Animated.View  style={[{backgroundColor: color}, styles.Btn, {
    transform: [{scale}]}]} >
      <Text
        billboarding={'on'}
        style={[styles.BtnLabel, {
        transform: [{   scale: textScale  }]}]}>
          {text}
       </Text>
       </ Animated.View>}
    </VrButton>
  }

  changeStateCuriosity= (arg) => {
    let newState= !this.state[arg]
    console.log(newState)
    this.setState({
      [arg]: newState,
      curiosity: arg,
      activeButton: arg
    },console.log(this.state))

    const btnConfig = {
        value: this.state.bounceValue,
        initial: 1.5,
        toValue: 1
      };

      this.bounce(btnConfig);
  }

  showAstronautAndProbe = (d,theta1,theta2,scale1,scale2,rotation)=>{
    return <View style={{position: 'absolute'}}>
    <Text style={styles.leaveText} >Find and Click the lander {"\n"}to leave the Planet </Text>
    <VrButton  onClick={()=>this.props.changePlanet("none")}>
    <Model
    source={{
      obj: asset('Astronaut.obj')
    }}
    texture={asset(`Astronaut.png`)}
    style={{
      transform: [
        {translate: [d*Math.sin(theta1*Math.PI/180),d*Math.sin(theta2*Math.PI/180),-d*Math.cos(theta1*Math.PI/180)*Math.cos(theta2*Math.PI/180)]},
        { scale:  scale1},
        {rotateY: rotation}
      ]
    }} />
    {this.showModel('lander',d,theta1+10,theta2,scale2,rotation)}
            </VrButton>
            </View>

  }


  showCuriosityCard = (arg) => {
    return <View billboarding={'on'} style={styles.curiosityCard}>
              <Text style={styles.curiosityTitle}> {} Mars Facts: </Text>
              <Text style={styles.curiosityText} > {arg} </Text>
            </View>
  }

  newCuriosityCard = (arg,d,theta1,theta2) => {
    return <View billboarding={'on'} style={{  borderRadius: 0.1,
      width: 50,
      height: 10,
      borderColor: '#9E7B5F',
      position:'absolute', transform: [{translate: [d*Math.sin(theta1*Math.PI/180),d*Math.sin(theta2*Math.PI/180),-d*Math.cos(theta1*Math.PI/180)*Math.cos(theta2*Math.PI/180)]}
]}}>
              <Text billboarding={'on'} style={styles.newCuriosityText} > {} Mars Facts: </Text>
              <Text billboarding={'on'} style={styles.newCuriosityText}> {curiosities[arg]} </Text>
            </View>
  }

  showModel = (model,d,theta1,theta2,scale,rotation=0)=>{
    return <Model
    source={{
      obj: asset(`${model}.obj`),
      mtl: asset(`${model}.mtl`)
    }}
    style={{
      transform: [
        {translate: [d*Math.sin(theta1*Math.PI/180),d*Math.sin(theta2*Math.PI/180),-d*Math.cos(theta1*Math.PI/180)*Math.cos(theta2*Math.PI/180)]},
        { scale:  scale},
        {rotateY: rotation}

      ]
    }} />
  }
  render() {
    return (
      <View>
      <Sound
       source={{ mp3: asset('mars.mp3') }}
       loop={true}
       volume={100}
      />

        <VideoPano
        playerState={this.state.playerState}
        source={[
          asset('Mars.mp4', {format: 'mp4', layout: 'SPHERE'}),
        ]}
      />
        {this.showAstronautAndProbe(15,-130,-10,0.8,1,135)}
        {this.circularButton(35,85,-5,this.changeStateCuriosity,"Curiosity_Rover","?",3,"#E2C9AB")}
        {this.circularButton(35,115,3,this.changeStateCuriosity,"horizon","?",3,"#E2C9AB")}
        {this.circularButton(35,-25,85,this.changeStateCuriosity,"sun","?",3,"#E2C9AB")}
        {this.circularButton(35,185,15,this.changeStateCuriosity,"year","?",3,"#E2C9AB")}
        {this.circularButton(35,185,-35,this.changeStateCuriosity,"red","?",3,"#E2C9AB")}
        {this.circularButton(35,-15,14,this.changeStateCuriosity,"mountain","?",3,"#E2C9AB")}
        {this.circularButton(35,25,35,this.changeStateCuriosity,"air","?",3,"#E2C9AB")}
        {this.circularButton(35,25,-90,this.changeStateCuriosity,"size","?",3,"#E2C9AB")}
        {this.circularButton(35,215,10,this.changeStateCuriosity,"wind","?",3,"#E2C9AB")}
        {this.circularButton(35,290,-15,this.changeStateCuriosity,"gravity","?",3,"#E2C9AB")}
        {this.showCuriosityCard(curiosities[this.state.curiosity])}
        {this.showModel("curiosity",1,85,-35,0.15,135+180)}

        </View>

    );
  }
};
 const curiosities ={
   none: "Click on the question marks around the planet to find out more about the planet.",
   sun: "A day on Mars lasts 24 hours and 39 minutes, so sunrise and sunset follow nearly the same rhythm as they do on Earth.",
   Curiosity_Rover: "The Curiosity rover weighs 900 kilograms, includes a mobile organic chemistry lab and a laser that can vaporise rocks",
   red: "Martian dust is reddish mostly due to the spectral properties of nanophase ferric oxides",
   wind: "The winds in the strongest Martian storms top out at about 60 miles per hour and model the dunes",
   horizon: "The horizon line is 3.40 km away, on the Earth is 4.7 kilometres",
   mountain: "Mars is home to the tallest mountain in the solar system. Olympus Mons, a shield volcano, is 21km high and 600km in diameter",
   air: "The atmosphere on Mars consists of 96% carbon dioxide and less than 0.2% oxygen (Earth has about 21% oxygen)",
   gravity: "Mars gravity is only 3.711 m/s², a slightly weaker gravity causes more damages on human body than a slightly heavier one (balance problems, visual disturbances, ‎damage to the heart muscle and bone loss).",
   year: "One year on Mars lasts 687 days",
   size: "Mars is the 7th biggest planet in the Solar System and the 5th heaviest body, while the first is your mom!"
 }

const styles = StyleSheet.create({

  curiosityCard:{
    position: 'absolute',
    borderRadius: 0.1,
    width: 1,
    height: 1,
    borderColor: '#9E7B5F',
    borderWidth: 0.03,
    backgroundColor: '#E2C9AB',
    layoutOrigin: [0, 0],
    transform: [{translate: [1, 0.5,-2]},
    { scale:  1}]
  },
  newCuriosityCard:{
    borderRadius: 0.1,
    width: 100,
    height: 100,
    borderColor: '#9E7B5F',
    borderWidth: 0.03,
    backgroundColor: '#E2C9AB',
  },
curiosityTitle:{
color:'black',
position:'relative',
fontSize: 0.1,
margin: 0.03
},
curiosityText:{
color:'black',
position:'relative',
fontSize: 0.08,
margin: 0.03
},

newCuriosityText:{
color:'black',
position:'relative',
fontSize: 3,
margin: 0.03
},

Btn: {
  opacity: 0.8,
  position: 'relative',
  borderRadius: 1.25,
  width: 2.5,
  height: 2.5,
  borderColor: 'black',
  borderWidth: 0.25,
  alignItems: 'center',
  justifyContent: 'center'
},
BtnLabel: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: 'red',
  fontSize: 0.5,
  fontFamily: 'Cochin'
},
Btn2: {
  opacity: 0.8,
  position: 'relative',
  borderRadius: 1.25,
  width: 10,
  height: 10,
  borderColor: 'black',
  alignItems: 'center',
  justifyContent: 'center'
},
BtnLabel2: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: 'black',
  fontSize: 0.5,
  fontFamily: 'Cochin'
},
leaveText:{
  fontWeight: 'bold',
  position: 'relative',
  fontSize: 0.4,
  color: 'black',
  paddingLeft: 0.2,
  paddingRight: 0.2,
  textAlign: 'center',
  textAlignVertical: 'center',
  transform: [{translate: [-2.2 , 0.3, -1.2]},
  { scale:  0.15}
]

}

})
