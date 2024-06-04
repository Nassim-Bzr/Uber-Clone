import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// tw
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
// icon
import { Icon } from "react-native-elements";

// image
import { Image } from "react-native";
import { useState } from 'react';

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

const RideOptionsCard = () => {

  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);

  

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

      <Text style={tw`text-center py-5 text-xl`}>Select a ride </Text>
        </View>


      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id  && "bg-gray-200"}`}
            onPress={() => setSelected(item)
          

            }
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
              <Text>Travel time</Text>
            </View>
              

            <Text style={tw`text-xl`}>35.34€
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

  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})