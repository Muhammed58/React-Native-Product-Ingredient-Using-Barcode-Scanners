import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import LoopText from 'react-native-loop-text';
import { TouchableOpacity,ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Home({navigation}) {
  const[loaded]=useFonts({
    PatrickHand: require('../../assets/fonts/PatrickHand-Regular.ttf'),
    Hobo: require('../../assets/fonts/HoboStd.otf'),
    Shadows: require('../../assets/fonts/ShadowsIntoLight-Regular.ttf'),
    Patrick: require('../../assets/fonts/PatrickHand-Regular.ttf'),
    Caveat: require('../../assets/fonts/Caveat-VariableFont_wght.ttf'),
  });
  const image = { uri: "https://latestnews.plus/wp-content/uploads/2021/04/application-that-reads-barcode-of-products-and-shows-all-information-uTQIBpuC.jpg" };


  const pressHandler =() =>{
    navigation.navigate('Barcode')    
  }
  
  const searchHandler = async() =>{
    navigation.navigate('SearchPage')
  }
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
       <ImageBackground source={image} resizeMode="cover" imageStyle={{opacity:0.6}} style={styles.image}>
        
        <Text style={styles.title}>IS</Text>
        <Text style={styles.title}>THIS</Text>
    {/* <Text style={styles.title}>...?</Text> */}
        <LoopText style={styles.titleAnimation} delay={1000} duration={1000} textArray={["...?","Sugar-free?","Gluten-free?"]}/>
            <TouchableOpacity style={styles.button} onPress={pressHandler}>
                <Text style={styles.font}>  SCAN BARCODE </Text>
            </TouchableOpacity>
            
            <Text style={{fontWeight:'bold',color:'#52006A', fontSize:20, fontFamily:'Patrick'}}>OR</Text>
            
            <TouchableOpacity style={styles.button} onPress={searchHandler}>
                <Text style={styles.font} > FIND BY NAME </Text>
            </TouchableOpacity>
        
       </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 0,
  },
  title:{
    fontSize: 110,
    marginTop:"-10%",
    fontFamily:'Shadows',
    color:"#52006A",
  },
  titleAnimation:{
    fontSize: 70,
    marginTop:"-10%",
    marginBottom:"1%",
    color:"#52006A",
    fontFamily:'Shadows',
  },
  button: {
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 25,
    margin:"1%",
    height:80,
    width:220,
  },
  font:{
    fontSize:30,
    margin:10,
    color:"yellow",
    fontFamily:'Patrick',
  },
  image: {
    flex: 1,
    width:'100%',
    paddingTop:40,
    alignItems:'center',
    justifyContent: "center"
  },
});
