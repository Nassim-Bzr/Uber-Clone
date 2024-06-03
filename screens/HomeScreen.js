import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions.js'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`} >
     <View style={tw`p-5`}>
        <Image
        style={
            {
                width:100, height:100,
                resizeMode:"contain",
            }
        }
        source={{
            
            url:"https://links.papareact.com/gzs",
        }} />
 
        <GooglePlacesAutocomplete
          styles={{
              container: {
                  flex: 0,
              },
              textInput: {
                  fontSize: 18,
              },
          }}
          placeholder="Where From?"
          nearByPlacesApi="GooglePlacesSearch"
          debounce={400}
          />

        <NavOptions/>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})