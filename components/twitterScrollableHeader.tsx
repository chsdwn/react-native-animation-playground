import React, { useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const TwitterScrollableHeader = () => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "lightskyblue",
          height: headerHeight,
        }}
      ></Animated.View>

      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        scrollEnabled
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
      >
        <View
          style={{
            height: PROFILE_IMAGE_MAX_HEIGHT,
            width: PROFILE_IMAGE_MAX_HEIGHT,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: "white",
            borderWidth: 3,
            overflow: "hidden",
            marginTop: HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../assets/profilePicture.png")}
            style={{ flex: 1, width: "100%", height: "100%" }}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 26, paddingLeft: 10 }}>
            Ali Veli
          </Text>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </View>
  );
};
