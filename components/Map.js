import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from "tailwind-react-native-classnames";
import { useSelector, useDispatch } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation } from '@react-navigation/native';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!origin || !destination) return;

    console.log("eyoooo")
    // Zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  if (!origin || !origin.location) {
    return null; // or some fallback UI
  }

  useEffect(() => {
    if (!origin || !destination) return;
  
    const getTravelTime = async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin.description)}&destinations=${encodeURIComponent(destination.description)}&key=${GOOGLE_MAPS_APIKEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
          console.log("API Response: ", data);
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
         
        } else {
          console.error("Error fetching travel time: ", data.error_message);
          setError(data.error_message);
        }
      } catch (error) {
        console.error("Error fetching travel time: ", error);
        setError(error.message);
      }
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY, dispatch]);
  

  return (
    <View style={{ flex: 1 }}>
      {error && <Text>Error: {error}</Text>}
      <MapView
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0005,
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({});
