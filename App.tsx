import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function App() {
  let [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    //Linear with label
    // => setInterval 대신 useInterval로 고치자
    if (progress >= 0 && progress <= 100) {
      let timeout = setInterval(() => {
        setProgress((progress += 1)), 20;
        if (progress === 100) {
          setProgress(0);
          clearInterval(timeout);
        }
      });
    }

    //Linear determinate
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Linear with label</Text>
      <ProgressBar
        bgColor={"red"}
        progress={progress}
        borderRadius={5}
        label={true}
        determinate={true}
      />
      <Text>Linear determinate</Text>
      <ProgressBar
        bgColor={"#609FFF"}
        borderRadius={0}
        progress={progress}
        determinate={true}
      />
      <Text>Linear indeterminate</Text>
      <ProgressBar
        bgColor={"#609FFF"}
        borderRadius={0}
        progress={progress}
        determinate={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 60,
  },
});
