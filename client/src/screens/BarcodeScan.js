import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductArray from './ProductArray';

export default function BarcodeScan({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [secondScanned, setsecondScanned] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    
        //Check if the scanned barcode matches the barcode of any product in the database.
        setScanned(true),
        ProductArray.map(item => item.barcode == data ? ( 
          navigation.navigate('ProductPage', 
                          {   ingredients: item.ingredients,
                              productName: item.productName,
                              barcodeNumber: item.barcode, 
                              productImage: item.image,
                              calorie: item.calorie,
                              protein: item.protein,
                              carbs: item.carbs,
                              isIt: item.isIt,
                              net: item.net,
                              fat: item.fat,
                          })
        ):(setsecondScanned(true))
        )
    };

      

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {secondScanned && scanned && <Button title={'Not Found! Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
