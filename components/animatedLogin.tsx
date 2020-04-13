import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import Animated, { Easing } from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Svg, { Circle, ClipPath, Image as ImageRNS } from "react-native-svg";

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
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
const {
  block,
  clockRunning,
  concat,
  cond,
  debug,
  eq,
  interpolate,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Clock,
  Extrapolate,
  Value,
} = Animated;

function runTiming(clock: Animated.Clock, value: any, dest: any) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export const AnimatedLogin = () => {
  const [isReady, setIsReady] = useState(false);

  const state = new Value(State.UNDETERMINED);
  const buttonOpacity = new Value(1);
  const open = new Value<0 | 1>(1);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - statusBarHeight, 0],
  });
  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () =>
      cond(
        eq(state, State.END),
        set(buttonOpacity, runTiming(new Clock(), open, not(open))),
        set(open, not(open))
      ),
    [state, buttonOpacity]
  );

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
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transform: [{ translateY: bgY }],
        }}
      >
        <Svg height={height} width={width}>
          <ClipPath id="clip">
            <Circle r={height} cx={width / 2} />
          </ClipPath>
          <ImageRNS
            href={require("../assets/bg.jpg")}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View style={{ height: height / 3 }}>
        <TapGestureHandler
          onHandlerStateChange={Animated.event([{ nativeEvent: { state } }])}
        >
          <Animated.View
            style={{
              ...styles.button,
              opacity: buttonOpacity,
              transform: [{ translateY: buttonY }],
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            ...styles.button,
            backgroundColor: "#2e71dc",
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }],
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            SIGN IN WITH FACEBOOK
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            height: height / 3,
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            zIndex: textInputZindex,
            elevation: textInputZindex,
            opacity: textInputOpacity,
            transform: [{ translateY: textInputY }],
          }}
        >
          <TapGestureHandler
            onHandlerStateChange={Animated.event([{ nativeEvent: { state } }])}
          >
            <Animated.View style={styles.closeButton}>
              <Animated.Text
                style={{
                  fontSize: 15,
                  transform: [{ rotate: concat(rotateCross, "deg") }],
                }}
              >
                X
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <TextInput
            placeholder="EMAIL"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <TextInput
            placeholder="PASSWORD"
            style={styles.textInput}
            placeholderTextColor="black"
          />
          <Animated.View style={styles.button}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>SIGN IN</Text>
          </Animated.View>
        </Animated.View>
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingLeft: 10,
    borderColor: "rgba(0,0,0,.2)",
  },
});
