import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TwitterScrollableHeader } from "./components/twitterScrollableHeader";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TwitterScrollableHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
