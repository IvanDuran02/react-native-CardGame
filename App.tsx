import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import * as Device from "expo-device";

export default function App() {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }

  useEffect(() => {
    changeScreenOrientation();
    if (Device.osName === "Android") {
      // only runs for android
      NavigationBar.setVisibilityAsync("hidden"); // hides navigation bar by default
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: "10px solid #fff",
  },
  text: {
    color: "black",
  },
});
