import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions.js';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice.js';

import NavFavourites from '../components/NavFavourites.js';
const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />

        <GooglePlacesAutocomplete
          styles={{
            container: { flex: 0 },
            textInput: { fontSize: 18 },
          }}
          onPress={(data, details = null) => {
            if (details && details.geometry && details.geometry.location) {
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description,
              }));
              dispatch(setDestination(null));
            } else {
              console.error("No details available or missing geometry");
            }
          }}
          placeholder="Where From?"
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            types: "establishment",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavourites/>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
