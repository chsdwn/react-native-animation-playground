import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const { Extrapolate, Value } = Animated;

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const TwitterScrollableHeader = () => {
  let scrollY = new Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  const profileImageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT + 5,
    ],
    extrapolate: Extrapolate.CLAMP,
  });

  const headerZIndex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -20, -20, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  if (
    headerHeight &&
    profileImageHeight &&
    profileImageMarginTop &&
    headerZIndex &&
    headerTitleBottom
  ) {
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
            alignItems: "center",
            zIndex: headerZIndex,
          }}
        >
          <Animated.View
            style={{ position: "absolute", bottom: headerTitleBottom }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
              Ali Veli
            </Text>
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          scrollEnabled
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
        >
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: "white",
              borderWidth: 3,
              overflow: "hidden",
              marginTop: profileImageMarginTop,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../assets/profilePicture.png")}
              style={{ flex: 1, width: "100%", height: "100%", zIndex: 0 }}
            />
          </Animated.View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 26, paddingLeft: 10 }}>
              Ali Veli
            </Text>
          </View>
          <View style={{ height: 1000 }}></View>
        </Animated.ScrollView>
      </View>
    );
  }
  return null;
};
