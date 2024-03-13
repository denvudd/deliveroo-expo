import React from "react";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

import { COLORS } from "@/constants/colors";

export default function LocationSearchPage() {
  const navigation = useNavigation();

  const [location, setLocation] = React.useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: "center",
    margin: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
