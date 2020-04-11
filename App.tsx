import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";

import { AnimatedLogin } from "./components/animatedLogin";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedLogin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
