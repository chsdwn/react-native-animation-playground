import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import Animated from "react-native-reanimated";

const cacheImages = (images: [any]) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const { width, height } = Dimensions.get("window");

export const AnimatedLogin = () => {
  const [isReady, setIsReady] = useState(false);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require("../assets/bg.jpg")]);

    await Promise.all([...imageAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Image
          source={require("../assets/bg.jpg")}
          style={{ flex: 1, height: "100%", width: "100%" }}
        />
      </View>
      <View style={{ height: height / 3 }}>
        <View style={styles.button}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
        </View>
        <View
          style={{
            ...styles.button,
            backgroundColor: "#2e71dc",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            SIGN IN WITH FACEBOOK
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
