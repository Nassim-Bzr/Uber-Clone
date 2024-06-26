import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity 
} from 'react-native'
import React, { useEffect } from 'react'
import {
    GooglePlacesAutocomplete
} from "react-native-google-places-autocomplete";
import {
    useDispatch
} from 'react-redux';
import {
    GOOGLE_MAPS_APIKEY
} from "@env";
import tw from "tailwind-react-native-classnames";
import {
    useNavigation
} from '@react-navigation/native';
import { setDestination } from "../slices/navSlice"; // Add the missing import statement
import NavFavourites from './NavFavourites';
// icon 
import { Icon } from "react-native-elements";


const NavigateCard = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const setInitialDestination = () => {
            dispatch(setDestination({
                location: null,
                description: null,
            }));
        };

        setInitialDestination();
    }, []); // Run the setInitialDestination function only once when the component mounts

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Bonjour, Nassim</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <GooglePlacesAutocomplete
                    placeholder="Where to?"
                    styles={toInputBoxStyles}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }));

                        navigation.navigate("RideOptionsCard");
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "fr",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                    <NavFavourites/>
                    
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("RideOptionsCard")}
                        style={tw`flex flex-row justify-between bg-black py-3 px-4 rounded-full `}>
                        <Icon
                            name="car"
                            type="font-awesome"
                            color="white"
                            size={16}
                        />
                        <Text style={tw` text-white text-center`}>Ride</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate("RideOptionsCard")}
                        style={tw`flex-row bg-black py-3 px-4 rounded-full`}>
                        <Icon
                            name="fast-food-outline"
                            type="ionicon"
                            color="white"
                            size={16}
                        />
                        <Text style={tw`ml-2 text-white text-center`}>Eats</Text>
                    </TouchableOpacity>
            
                    </View>

        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})