import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "react-native-elements";
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "123",
    title: "Taxi",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "456",
    title: "UberX",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "789",
    title: "UberXL",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
  {
    id: "654",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`absolute top-3 z-50 left-5 p-3 rounded-full`]} 
        >
          <Icon
            name="chevron-left"
            type="fontawesome"
          />
        </TouchableOpacity>

        <Text style={tw`text-center py-5 text-xl`}> 
          Choisissez une course - {travelTimeInformation?.distance?.text || "Loading..."}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />

            <View style={tw`-ml-6`}>  
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text || "N/A"} de trajet</Text>
            </View>

            <Text style={tw`text-xl`}>
              {travelTimeInformation?.duration?.value ? 
                new Intl.NumberFormat('fr-gb', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(
                  (travelTimeInformation.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                ) : 
                "N/A"
              }
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw.style(
            `bg-black py-3 m-3`,
            !selected && "bg-gray-200"
          )}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RideOptionsCard;
