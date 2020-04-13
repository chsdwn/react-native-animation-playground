import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

// VARIABLES
const { width } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

const imageList = [
  { id: 1, name: "image 1", uri: require("../assets/1.jpg") },
  { id: 2, name: "image 2", uri: require("../assets/2.jpg") },
  { id: 3, name: "image 3", uri: require("../assets/3.jpg") },
  { id: 4, name: "image 4", uri: require("../assets/4.jpg") },
];

// COMPONENTS
const Tab: React.FC<{ icon: string; isSelected: boolean }> = ({
  icon,
  isSelected,
}) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Ionicons name={icon} color={isSelected ? "black" : "white"} size={30} />
  </View>
);

const GridImage: React.FC<{
  image: { id: number; name: string; uri: any };
  width: number;
}> = ({ image, width }) => (
  <View key={image.id} style={{ width, height: width, marginVertical: 10 }}>
    <Image
      source={image.uri}
      style={{ flex: 1, width: undefined, height: undefined }}
    />
  </View>
);

export const TabbarShuffle = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [images, setImages] = useState(imageList);
  const ref = useRef<TransitioningView>(null);
  const transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
    </Transition.Together>
  );

  useEffect(() => {
    ref.current!.animateNextTransition();
    console.log("useEffect", images);
  }, []);

  const onRandomizeImages = () => {
    ref.current!.animateNextTransition();
    const shuffledImages = images.sort(() => 0.5 - Math.random());
    setImages(shuffledImages);
  };
  const onTabSelect = (tabIndex: number) => {
    ref.current!.animateNextTransition();
    setSelectedTab(tabIndex);
  };

  return (
    <Transitioning.View ref={ref} transition={transition} style={{ flex: 1 }}>
      <View style={{ ...styles.tabContainer }}>
        <View
          style={{
            position: "absolute",
            height: 70,
            width: (width - 30) / 2,
            backgroundColor: "skyblue",
            left: selectedTab === 0 ? 0 : undefined,
            right: selectedTab === 1 ? 0 : undefined,
          }}
        ></View>
        <TouchableOpacity onPress={() => onTabSelect(0)} style={{ flex: 1 }}>
          <Tab
            icon={Platform.OS === "ios" ? "ios-photos" : "md-photos"}
            isSelected={selectedTab === 0 ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabSelect(1)} style={{ flex: 1 }}>
          <Tab
            icon={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            isSelected={selectedTab === 1 ? true : false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {selectedTab === 0
          ? images.map((image, i) => (
              <GridImage key={i} image={image} width={width / 2 - 20} />
            ))
          : null}
      </View>

      <TouchableWithoutFeedback onPress={() => onRandomizeImages()}>
        <View
          style={{
            height: 70,
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Randomize Images</Text>
        </View>
      </TouchableWithoutFeedback>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 70,
    flexDirection: "row",
    marginTop: statusBarHeight,
    borderRadius: 70,
    width: width - 30,
    marginHorizontal: 15,
    backgroundColor: "lightblue",
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
