import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const images = [
  {
    id: 1,
    uri:
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
  },
  {
    id: 2,
    uri:
      "https://cdn.pixabay.com/photo/2018/09/14/10/35/eggs-3676707_960_720.jpg",
  },
  {
    id: 3,
    uri:
      "https://cdn.pixabay.com/photo/2019/04/11/12/40/easter-4119709_960_720.jpg",
  },
  {
    id: 4,
    uri:
      "https://cdn.pixabay.com/photo/2020/04/07/20/36/bunny-5014814_960_720.jpg",
  },
];

const HEADER_HEIGHT = 70;

export const AirbnbHeader = () => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          backgroundColor: "#238283",
          zIndex: 1000,
          elevation: 1000,
          transform: [{ translateY: headerY }],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Animated Header</Text>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        style={{ paddingTop: HEADER_HEIGHT }}
      >
        {images.map((image) => (
          <View key={image.id} style={{ height: 400, margin: 20 }}>
            <Image
              source={{ uri: image.uri }}
              style={{ flex: 1, resizeMode: "cover", borderRadius: 10 }}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};
