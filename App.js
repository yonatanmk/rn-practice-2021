import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ possibleFriends, navigation, route }) {
  const num = route?.params?.num;
  return (
    <View style={styles.container}>
      <Text>Details Screen: {num}</Text>
      {possibleFriends.map((friend, i) => (
        <Text key={`friends-${i}`}>{friend}</Text>
      ))}
      <Button
        title="Go to Details, Does nothing"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="Go to Details, push"
        onPress={() =>
          navigation.push("Details", {
            num: num ? num + 1 : 1,
          })
        }
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function StartStack() {
  const [possibleFriends, setPossibleFriends] = useState([
    "Allie",
    "Gator",
    "Lizzie",
  ]);
  // const possibleFriends = ["Allie", "Gator", "Lizzie"];
  const [currentFriends, setCurrentFriends] = useState([]);

  addFriend = (index) => {
    // const {currentFriends, possibleFriends} = this.state;

    // Pull friend out of possibleFriends
    const addedFriend = possibleFriends.splice(index, 1);

    // And put friend in currentFriends
    setPossibleFriends(possibleFriends);
    setCurrentFriends(addedFriend);
  };

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="Home"
  //         component={HomeScreen}
  //         options={{ title: "Overview" }}
  //       />
  //       <Stack.Screen name="Details">
  //         {(props) => (
  //           <DetailsScreen {...props} possibleFriends={possibleFriends} />
  //         )}
  //       </Stack.Screen>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Overview" }}
      />
      <Stack.Screen name="Details">
        {(props) => (
          <DetailsScreen {...props} possibleFriends={possibleFriends} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={StartStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
