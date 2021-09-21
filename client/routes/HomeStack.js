import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import BarcodeScan from "../src/screens/BarcodeScan"
import SearchPage from "../src/screens/SearchPage"
import ProductPage from "../src/screens/ProductPage"

import Home from '../src/screens/Home';


const screens = {
    Home: {
        screen: Home
    },
    Barcode: {
        screen: BarcodeScan
    },
    SearchPage: {
        screen: SearchPage
    },
    ProductPage: {
        screen: ProductPage
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);