import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  StyleSheet,
  VrButton,
  Sound,
  AmbientLight,
  PointLight,
  Animated,
}  from 'react-vr';

const AnimatedModel = Animated.createAnimatedComponent(Model);

export default class Moon extends React.Component {

  state={
    rotation: new Animated.Value(0),
    bounceValue: new Animated.Value(1),
    curiosity: "none",
    sun: false,
    Chang4: false,
    atmosphere: false,
    year: false,
    nuclear: false,
    horizon: false,
    gravity: false,
    away: false,
    quakes: false,
    activeButton: null
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
       duration: 30000,
     }
   ).start(this.rotate);
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
    <Text billboarding={'on'} style={styles.leaveText} >Find and Click the lander {"\n"}to leave the Planet </Text>
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

  showCuriosityCard = (arg) => {
    return <View billboarding={'on'} style={styles.curiosityCard}>
              <Text style={styles.curiosityTitle}> {} Moon Facts: </Text>
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

  showMoon = (d,theta1,theta2)=>{
    return <AnimatedModel
    lit={true}
    source={{obj: asset(`Earth.obj`)}}
    texture={asset(`Earth.png`)}
    lit={true}
    style={{
      transform: [
        {translate: [d*Math.sin(theta1*Math.PI/180),d*Math.sin(theta2*Math.PI/180),-d*Math.cos(theta1*Math.PI/180)*Math.cos(theta2*Math.PI/180)]},
        {rotateY: this.state.rotation}

      ]
    }} />
  }



  render() {
    return (
      <View>
      <Pano source={asset('moon.jpg')}/>
      <AmbientLight intensity={0.5} />
      <PointLight
style={{
  color:'white', transform:[{translate:[0, 0, 0]}]
}}
/>
      <Sound
       source={{ mp3: asset('moon.mp3') }}
       loop={true}
      />
      {this.showAstronautAndProbe(15,-130,-10,0.8,1,135)}
      {this.showCuriosityCard(curiosities[this.state.curiosity])}

      {this.circularButton(35,180,-15,this.changeStateCuriosity,"Chang4","?",3,"white")}
      {this.circularButton(35,110,30,this.changeStateCuriosity,"sun","?",3,"white")}
      {this.circularButton(35,140,6,this.changeStateCuriosity,"horizon","?",3,"white")}
      {this.circularButton(35,-130,30,this.changeStateCuriosity,"atmosphere","?",3,"white")}
      {this.circularButton(35,-72,-10,this.changeStateCuriosity,"nuclear","?",3,"white")}
      {this.showMoon(200,-30,40)}
      {this.circularButton(35,-30,30,this.changeStateCuriosity,"away","?",3,"white")}
      {this.circularButton(35,-45,40,this.changeStateCuriosity,"quakes","?",3,"white")}
      {this.circularButton(35,180,35,this.changeStateCuriosity,"gravity","?",3,"white")}

      </View>
    );
  }
};

const curiosities = {
  none: "Click on the question marks around the planet to find out more about the planet.",
  sun: "A day on the Moon lasts as long as 29.5 Earth days. The year has the same length being a Earth's satellite, ut lasts only 12 Moon days.",
  Chang4: "Chang'e 4 is a Chinese lunar exploration mission that achieved the first soft landing on the dark side of the Moon. In reality both sides of the Moon see the same amount of sunlight however only one face of the Moon is ever seen from Earth.",
  atmosphere: "The sky is black because of the absence of atmosphere. Escape velocity for moon is very low. So gases can escape very easily due to their thermal motion",
  nuclear: "During the 1950’s the USA considered detonating a nuclear bomb on the Moon. The secret project was during the height cold war was known as “A Study of Lunar Research Flights” or “Project A119” and meant as a show of strength at a time they were lagging behind in the space race.",
  horizon: "The horizon line is 2.43 km away, on the Earth is 4.7 kilometres",
  gravity: "Mars gravity is only 1.622 m/s², a slightly weaker gravity causes more damages on human body than a slightly heavier one (balance problems, visual disturbances, ‎damage to the heart muscle and bone loss).",
  away: "The Moon is moving approximately 3.8 cm away from our planet every year.",
  quakes: "The Moon has quakes. These are caused by the gravitational pull of the Earth. "
}


const styles = StyleSheet.create({
leaveText:{
  fontWeight: 'bold',
  position: 'relative',
  fontSize: 0.4,
  color: 'white',
  paddingLeft: 0.2,
  paddingRight: 0.2,
  textAlign: 'center',
  textAlignVertical: 'center',
  transform: [{translate: [-2.4 , 0.8, -1.2]},
  { scale:  0.15}
]
},

  curiosityCard:{
    position: 'absolute',
    borderRadius: 0.1,
    width: 1.5,
    height: 1.5,
    borderColor: 'red',
    borderWidth: 0.03,
    backgroundColor: 'white',
    layoutOrigin: [0, 0],
    transform: [{translate: [1, 1.2,-2.5]},
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
color:'red',
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
  color: 'red',
  fontSize: 0.5,
  fontFamily: 'Cochin'
},

})
