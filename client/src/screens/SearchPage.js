import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useFonts } from 'expo-font';
import * as Network from 'expo-network';
import ProductArray from './ProductArray';
import { StatusBar } from 'expo-status-bar';
import { faSearch, faCheckCircle, faTimes, faHome, faHeart  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Keyboard,ImageBackground,TouchableOpacity, 
        ScrollView, TextInput, StyleSheet, 
        TouchableWithoutFeedback, Image, 
        Text, View, Dimensions, Platform } from 'react-native';

export default function SearchPage({navigation}) {
    const [category, setcategory] = useState("All")
    const [product, setproduct] = useState([])
    
    useEffect(() => {
        // Make a request for a product
        const getProduct = async () => {
            
            // Network component for testing in local. Should be change with hosting link when deploy
            const network = await Network.getIpAddressAsync();
            console.log(network)
            
            await axios.get(`http://${network}:5000/products`)
            .then( response => {
                return setproduct(response.data)
            })
            .catch( (error) => { 
                console.log(error);
            });
            
        }
        
        getProduct()
    },[])
    
    
    
    //Font define
    const[loaded]=useFonts({
        PatrickHand: require('../../assets/fonts/PatrickHand-Regular.ttf'),
        Hobo: require('../../assets/fonts/HoboStd.otf'),
        Shadows: require('../../assets/fonts/ShadowsIntoLight-Regular.ttf'),
        Patrick: require('../../assets/fonts/PatrickHand-Regular.ttf'),
        Caveat: require('../../assets/fonts/Caveat-VariableFont_wght.ttf'),
    });
    const image = { uri: "https://latestnews.plus/wp-content/uploads/2021/04/application-that-reads-barcode-of-products-and-shows-all-information-uTQIBpuC.jpg" };
  
    
    const KeyboardDismiss = ({children}) => (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
           {children}
          </TouchableWithoutFeedback>
      );
              
        const categoryList=['SugarFree','GlutenFree', 'DairyFree', 'SoyFree']
        const productsArray = ProductArray;
        const ProductsList = () =>{
            return product.map((element,index) => {
            return (
            <View key={ index }>
                {element.isIt.includes(category) || category.includes('All') ? (
                    <TouchableOpacity  activeOpacity={.8} style ={ styles.product }
                                       onPress={() => {navigation.navigate('ProductPage', 
                                                            {   ingredients: element.ingredients,
                                                                productName: element.productName,
                                                                barcodeNumber: element.barcode, 
                                                                productImage: productsArray[index],
                                                                calorie: element.calorie,
                                                                protein: element.protein,
                                                                carbs: element.carbs,
                                                                isIt: element.isIt,
                                                                net: element.net,
                                                                fat: element.fat,
                                                            })}}>                        
                            <React.Fragment>
                                <View style={styles.imageContainer}>
                                    <Image style={styles.productImage} source={productsArray[index]} ></Image>
                                </View>
                                <Text style={styles.productName}>{element.productName}</Text>
                                
                                <View style={{flexWrap:"wrap", flexDirection:"row", borderTopWidth:1, width:"100%",alignItems:"center", marginLeft:width * 0.07, paddingTop:height * 0.02, marginBottom:0, borderColor:"lightgray",}}>
                                    {categoryList.map((value2,index)=>{
                                        return (<View style={{flexDirection:"row", width:"50%", marginBottom:0, marginTop:10, paddingLeft:10, borderWidth:0,}} key={index}>
                                                    <FontAwesomeIcon size={ 20 } 
                                                                    style={{color: element.isIt.some(item => value2.includes(item))? "green": "red",}} 
                                                                    icon={ element.isIt.some(item => value2.includes(item)) ? faCheckCircle : faTimes}/>
                                                    <Text key={index} style={styles.features}> 
                                                            {value2}
                                                    </Text>
                                                </View>
                                                
                                        )})}
                                </View>
                                <Text style={{fontWeight:"bold",}}>Tab For More</Text> 
                            </React.Fragment>
                        </TouchableOpacity>
                        ): null
                    } 
            </View>)
          })
      }

    const mainPageHandler =() =>{
        navigation.navigate('Home')    
    }
    
      
    if (!loaded) {
        return null;
    }
    return (
        <KeyboardDismiss >
                <View>
                <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false} style={styles.container}>
                <View>
                <ImageBackground source={image} resizeMode="cover" imageStyle={{opacity:0.7 ,height: height * 1.3,}} style={styles.image}>
                <StatusBar barStyle="dark-content" />
                {/* Logo and SearchBar */}
                    <View style={styles.topScreen}>
                        <Text style={{ fontSize:height * 0.09, fontFamily:'Shadows',}}>IS THIS ...?</Text>
                        <View style={ styles.topBar }>
                            <FontAwesomeIcon size={ width * 0.09 } style={styles.searchIcon} icon={ faSearch }/>
                            <TextInput
                                style={styles.searchBar}
                                placeholder='Enter product name'
                                placeholderTextColor={'#B2B1B9'}
                                />
                        </View>   
                    </View>
                    {/* Category */}
                    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        <View>
                            <TouchableOpacity onPress={()=> setcategory("All")} activeOpacity={.8} style ={styles.button}>
                                <Text style={styles.categoryText}>All</Text>
                            </TouchableOpacity> 
                        </View>

                        <View>
                            <TouchableOpacity onPress={()=> setcategory("SugarFree")} activeOpacity={.8} style ={styles.button}>
                                <Text style={styles.categoryText}>Sugar-free</Text>
                           </TouchableOpacity> 
                        </View>

                        <View>
                            <TouchableOpacity onPress={()=> setcategory("GlutenFree")} activeOpacity={.8} style ={styles.button}>
                                <Text style={styles.categoryText}>Gluten-free</Text>
                            </TouchableOpacity> 
                        </View>

                        <View>
                            <TouchableOpacity onPress={()=> setcategory("DairyFree")} activeOpacity={.8} style ={styles.button}>
                                <Text style={styles.categoryText}>Dairy-free</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity onPress={()=> setcategory("SoyFree")}  activeOpacity={.8} style ={styles.button}>
                                <Text style={styles.categoryText}>Soy-free</Text>
                            </TouchableOpacity> 
                        </View>
                    </ScrollView> 

                    {/* Product */}
                    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={styles.horizontalScrollProduct}>
                        <ProductsList/>
                    </ScrollView>
                    
                </ImageBackground>
                </View>
                </ScrollView>
                {/* Navbar */}
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
                        <FontAwesomeIcon size={ width * 0.08 } icon={ faSearch }
                            style={{
                                marginLeft: width * 0.20,
                                marginTop: height * 0.016,
                                marginRight: height * 0.08,
                                color:"lightgray",
                            }}
                        />
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
                                <FontAwesomeIcon size={ width * 0.12 } icon={ faHome }
                                    style={{
                                        color:"darkgray",
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <FontAwesomeIcon size={ width * 0.08 } icon={ faHeart }
                            style={{
                                marginLeft: width * 0.71,
                                marginTop: height * -0.044,
                                color:"lightgray",
                            }}/>
                    </View>
                
                </View>
            
        </KeyboardDismiss>
    );
};



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      margin:0,
      height: height * 1.0,
      backgroundColor: '#fff',
    },
    image: {
        borderWidth:0, 
        paddingTop:height * 0.05,
       /*  height: height * 1.1, */
        paddingBottom:100,
        alignItems:"center",
        justifyContent: "center"
    },
    topScreen:{
        flex:1,
        alignItems:'center',
    },
    topBar:{
        flex:1,  
        flexDirection:'row',
        justifyContent:"center", 
    },
    searchBar:{
        elevation:5,
        textAlign:'center',
        width: width * 0.8,
        height: width * 0.17,
        fontSize: width * 0.05,
        paddingRight: Platform.OS === 'ios' ?  width * 0.09 : 0,
        paddingLeft: Platform.OS === 'ios' ?  0: 35,
        borderLeftWidth: width * 0.18,
        marginBottom: width * 0.05,
        backgroundColor:'#fff',
        borderColor:'#50CB93',
        borderRadius:40,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 5, 
        shadowOffset: {
            height: 0,
            width: 0,
        }
    },
    searchIcon:{
        zIndex:1,
        elevation:5,
        color:'white',
        marginTop: width * 0.04,
        marginRight: width * -0.14,
    },
    horizontalScroll:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#B2B1B9",
        margin: height * 0.0010,
        marginHorizontal: 0,
        elevation:1,
    },
    horizontalScrollProduct:{
        marginTop:0,
        marginBottom:30,
        paddingBottom:20,
        marginHorizontal:0,
        paddingLeft:33,
        paddingTop:0,
    },
    product:{
        elevation:5,
        alignItems:"center",
        width: width * 0.8,
        height: height * 0.49,
        marginTop: height * 0.02,
        marginRight:width * 0.06,
        marginBottom: height * 0.02,
        paddingBottom: height * 0.021,
        borderWidth:0,
        borderRadius:40,
        borderColor:"black",
        backgroundColor :"white",
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 5, 
        shadowOffset: {
            height: 2,
            width: 0,
        }
    },
    imageContainer:{
        justifyContent:"flex-start",
        width:width * 0.69,
        height: height * 0.2,
        marginTop:height * 0.02,
        alignItems:"center",
        borderWidth:0,
        shadowColor:"black",
        shadowOpacity:0.2,
        shadowRadius:5,
        borderRadius:20,
    },
    productImage:{
        marginTop: height * 0.029,
        maxHeight: height * 0.15,
        resizeMode:'contain',
        maxWidth:width * 0.7,
    },
    productName:{
        fontWeight:"bold",
        fontSize:height * 0.03,
        marginTop:height * 0.02,
    },
    listProduct:{
        width: width * 0.75,
        height:height * 0.15,
        alignItems:"flex-start",
        borderTopWidth:1,
        borderRadius:10,
        borderColor:"lightgray",
        marginTop:height * 0.01,
        marginBottom:height * 0.01,
        flexDirection: "row",
    },
    features:{
        fontWeight:"bold",
        borderWidth:0,
        marginBottom:20,
        justifyContent:"center",
        marginLeft:4,
        fontSize: height * 0.021,
    },
    button:{
        width: width * 0.45,
        height: width * 0.1,
        elevation: 4,
        alignItems:"center",
        justifyContent:"center",
        marginTop :height * 0.01,
        marginBottom:height * 0.01,
        marginLeft:5,
        marginRight:width * 0.04,
        borderWidth:0,
        borderRadius:20,
        color:"#C06014",
        fontWeight:"bold",
        borderColor:"black",
        backgroundColor :"white",
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2, 
        shadowOffset: {
            height: 1,
            width: 1,
        }
    },
    
    categoryText:{
        fontSize:width * 0.05,
        fontWeight:"bold",
        fontFamily:"Hobo",
    },
    
});