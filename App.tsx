import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import * as Device from "expo-device";

export default function App() {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }

  const [pressed, setPressed] = useState(true);
  const device = Device.osName; // Android: "Android"; iOS: "iOS" or "iPadOS"; web: "iOS", "Android", "Windows"

  const [time, setTime] = useState(0);

  const handlePress = () => {
    setPressed(!pressed);
    console.log(pressed);
    if (!pressed) {
      setTime(0);
    }
  };

  useEffect(() => {
    changeScreenOrientation();
    if (device === "Android") {
      // only runs for android
      NavigationBar.setVisibilityAsync("hidden"); // hides navigation bar by default
    }
    if (pressed) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      console.log(time);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  if (device === "iOS") {
    return (
      <View style={styles.container}>
        {pressed ? (
          <>
            <Text style={styles.text}>
              You are in matchmaking for {time} seconds
            </Text>
            <Button
              title="Leave Matchmaking"
              color="#fff"
              onPress={() => {
                handlePress();
              }}
            />
          </>
        ) : (
          <Button
            title="Join Matchmaking"
            color="#fff"
            onPress={() => {
              handlePress();
            }}
          />
        )}

        <StatusBar hidden />
      </View>
    );
  }
  if (device === "Android") {
    return (
      <View style={styles.container}>
        {pressed ? (
          <>
            <Text style={styles.text}>
              You are in matchmaking for {time} seconds
            </Text>
            <Button
              title="Leave Matchmaking"
              color="#171717"
              onPress={() => {
                handlePress();
              }}
            />
          </>
        ) : (
          <Button
            title="Join Matchmaking"
            color="#171717"
            onPress={() => {
              handlePress();
            }}
          />
        )}

        <StatusBar hidden />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
