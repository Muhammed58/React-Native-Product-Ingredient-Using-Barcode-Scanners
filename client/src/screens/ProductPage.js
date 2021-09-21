import React from 'react'
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faHome, faHeart, faFire, faStar, faTimes, faCheckCircle, faAtom } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity,ImageBackground, Dimensions, StyleSheet, Text, View, Image, ScrollView, Platform} from 'react-native';



export default function ProductPage({navigation}) {

    //Font define
    const[loaded]=useFonts({
        Hobo: require('../../assets/fonts/HoboStd.otf'),
        Patrick: require('../../assets/fonts/PatrickHand-Regular.ttf'),
        PatrickHand: require('../../assets/fonts/PatrickHand-Regular.ttf'),
        Caveat: require('../../assets/fonts/Caveat-VariableFont_wght.ttf'),
        Shadows: require('../../assets/fonts/ShadowsIntoLight-Regular.ttf'),
    });
    const image = { uri: "https://latestnews.plus/wp-content/uploads/2021/04/application-that-reads-barcode-of-products-and-shows-all-information-uTQIBpuC.jpg" };

    const mainPageHandler =() =>{
        navigation.navigate('Home')    
    }
    const searchPageHandler =() =>{
        navigation.navigate('SearchPage')    
    }

    const categoryList=['SugarFree','GlutenFree', 'DairyFree', 'SoyFree']

    const height = Dimensions.get('window').height;
    const width  = Dimensions.get('window').width;
    if (!loaded) {
        return null;
    }
    return (
        <View style={{height:'100%', width:'100%'}}>
        <ImageBackground source={require('../../assets/photos/barcode.jpeg')} resizeMode="cover" imageStyle={{opacity:0.3 ,height: height * 1.3,}} style={styles.image}>
            <StatusBar barStyle="dark-content" />

           
            <View style={{
                width: '100%',
                height: height * 0.08,
                backgroundColor:'rgba(255,255,255,0.3)',
                shadowColor: "gray",
                alignItems:'center',
                elevation:0.3,
                justifyContent:'center',
                shadowOpacity: .9,
                shadowRadius: 5,
                shadowOffset:{
                    height: 3,
                }
            }}>
                <Text style={{
                    fontSize:height * 0.04,
                    fontWeight:"bold",
                }}>{navigation.getParam('productName')}</Text>
            </View>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{height:height *0.9, }}>
       

            <View style={styles.mainContainer}>
          
                <Image source={navigation.getParam('productImage')}  style={{width:width *0.8, 
                                                                            resizeMode:'contain',
                                                                            height:height * 0.23,
                                                                            marginBottom:height * 0.01,
                                                                        }}/>
               
            </View>

            <View style={{
                width:"100%", 
                borderTopWidth:0,
                borderBottomWidth:1,
                paddingTop:20,
                paddingBottom:30,
                alignItems:'center',
                borderColor:"lightgray",
                justifyContent:"center",
            }}>
                <Text style={{fontSize:height * 0.03, fontWeight:'bold', marginBottom:height * 0.02, color:'black'}}>NET: {navigation.getParam('net')} </Text>
                
                <View style={{flexDirection:'row', flexWrap:"wrap", alignItems:"center", justifyContent:"center",}}>
                    <FontAwesomeIcon size={ width * 0.05 } icon={ faFire } style={{color:"red"}}/>
                    <Text style={{
                        fontSize: height *0.02, fontWeight:"bold", marginBottom:height * 0.04,
                    }}> Calorie {navigation.getParam('calorie')}</Text>

                </View>
                
                <View style= {{
                    flexWrap:"wrap",
                    flexDirection:"row",
                    justifyContent:"center",}}>

                    <FontAwesomeIcon style={{color:"gray",}} size={ width * 0.05 } icon={ faStar }/>
                    <Text style={styles.nutrients}> Protein: {navigation.getParam('protein')}</Text>
                    <FontAwesomeIcon style={styles.star} size={ width * 0.05 } icon={ faStar }/>
                    <Text style={styles.nutrients}> Carb: {navigation.getParam('carbs')}</Text>
                    <FontAwesomeIcon style={styles.star} size={ width * 0.05 } icon={ faStar }/>
                    <Text style={styles.nutrients}> Fat: {navigation.getParam('fat')}</Text>

                </View>

            </View>
             
            {/* Category List */}
            
                <View style={{flexWrap:"wrap", flexDirection:"row", borderBottomWidth:1, borderColor:"lightgray", marginLeft:width * 0.07, marginBottom:30,}}>
                    {categoryList.map((value2,index2)=>{
                        return (<View key={index2}  style={{flexDirection:"row", width:"50%", marginBottom:0, marginTop:10, paddingLeft:10, borderWidth:0,}}>
                                    <FontAwesomeIcon size={ 20 } 
                                                     style={{color: navigation.getParam("isIt").some(item => value2.includes(item)) ? "green": "red",}} 
                                                     icon={ navigation.getParam("isIt").some(item => value2.includes(item)) ? faCheckCircle : faTimes}/>
                                    <Text style={styles.features}> 
                                            {value2}
                                    </Text>
                                </View>
                        )})}
                </View>
            {/* ------------ */}
            
            {/* Ingredients List */}
            <View style={{numColumns:1, flexWrap:"wrap", flexDirection:"row"}}>
                {navigation.getParam("ingredients").map((value,index)=>{
                    return(<View style={{flexDirection:"row", width:"25%", borderWidth:0, marginLeft:width * 0.06, marginBottom:width * 0.05,}} key={index}>
                                    <FontAwesomeIcon size={ 20 } 
                                            style={{color:"green", marginRight:5,}} 
                                            icon={faAtom}/>

                                    <Text>{value}</Text>
                                </View>)
                })}
            </View>
            {/* --------------- */}
            </ScrollView>
        </ImageBackground>

        {/* ---------------------Navbar----------------- */}
            <View style={{
                        height: height * 0.07,
                        bottom:0,
                        width:"100%",
                        borderWidth:0,
                        borderTopRightRadius:40,
                        borderTopLeftRadius:40,
                        shadowColor:"gray",
                        shadowRadius:1,
                        shadowOpacity:0.9,
                        elevation:5,
                        shadowOffset:{
                            height:15,
                        },
                        position:"absolute",
                        flexDirection:"row",        
                        flexWrap:"wrap",
                        backgroundColor:"white",
                    }}>
                        <TouchableOpacity 
                            activeOpacity={.9}
                            onPress={searchPageHandler}>
                            <FontAwesomeIcon size={ width * 0.08 } icon={ faSearch }
                                style={{
                                    marginLeft: width * 0.20,
                                    marginTop: height * 0.016,
                                    marginRight: height * 0.08,
                                    color:"lightgray",
                                }}
                                />
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            activeOpacity={.9}
                            onPress={mainPageHandler}>

                            <View style={{
                                elevation:3,
                                backgroundColor:"white",
                                width: width * 0.15,
                                height: width * 0.15,
                                padding:5,
                                borderRadius:50,
                                marginTop: height * -0.03,
                                alignItems:"center",
                                shadowColor:"black",
                                shadowRadius:5,
                                shadowOpacity:0.5,
                                shadowOffset:{
                                    width:0,
                                    height:0,
                                }
                            }}>
                                <FontAwesomeIcon size={ width * 0.12 } icon={ faHome } style={{color:"darkgray",}}/>
                            </View>
                        </TouchableOpacity>
                        <FontAwesomeIcon size={ width * 0.08 } icon={ faHeart }
                            style={{
                                marginLeft: width * 0.71,
                                marginTop: height * -0.044,
                                color:"lightgray",
                            }}/>
                </View>
                {/* ---------------------Navbar END----------------- */}
        </View>
    )
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image: {
        borderWidth:0,
        paddingTop:height * 0.05,
        paddingBottom:100,
        alignItems:"center",
        justifyContent: "center"
    },
 
    mainContainer:{
        width:"100%",
        alignItems:"center",
        paddingTop:height * 0.05,
        borderBottomWidth:0.2,
        borderColor:"gray",
    },
    star:{
        marginLeft:width * 0.03,
        color:"gray",
    },
    nutrients:{
        fontSize: height * 0.02
    },
    listProduct:{
        width: "100%",
        height:height * 0.15,
        alignItems:"center",
        borderBottomWidth:1,
        borderColor:"lightgray",
    },
    features:{
        fontWeight:"bold",
        borderWidth:0,
        marginBottom:20,
        justifyContent:"center",
        marginLeft:4,
        fontSize: height * 0.021,
    },
    listProduct2:{
        width: "100%",
        alignItems:"center",
        borderBottomWidth:1,
        marginLeft:20,
        borderColor:"lightgray",
        marginTop:height * 0.01,
        marginBottom:height * 0.03,
        flexDirection: "row",
    },
    features2:{
        width: width * 0.32,
        height: height * 0.05,
        marginLeft:width * 0.02,
        borderWidth:0,
        marginTop: height * 0.01,
        paddingLeft: width * 0.01,
        paddingTop:  height >= 700 ? 
                                    ( Platform.OS ==="ios" ? width * 0.01 : width * -0.02)
                                    : width * 0.005 ,
        fontSize: height * 0.018,
        fontFamily:"Patrick",
    },
})

