import React, { Component } from "react";
import { WebView } from "react-native";
// import { Video } from "expo";
// import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
// import { Constants, Components } from "expo";
// import React from 'react';
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Video } from "expo";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

export default class LessonVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      shouldPlay: true
    };
  }

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay
    }));
  };

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute
    }));
  };

  render() {
    const { width } = Dimensions.get("window");
    const {
      props: {
        navigation: {
          state: {
            params: { link }
          }
        }
      }
    } = this;
    console.log("links", link);
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Video
          source={{
            uri: link
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          useNativeControls={true}
          resizeMode="contain"
          shouldPlay
          style={{ width, height: 300 }}
        />
      </View>
      // <View style={styles.container}>
      //   <View>
      //     <Text style={{ textAlign: "center" }}> React Native Video </Text>
      //     <Video
      //       source={{
      //         uri:
      //           "https://www.dropbox.com/s/6znup0q8x6zt67x/deepin-screen-recorder_Select%20area_20190531011248.mp4?dl=0"
      //       }}
      //       shouldPlay={this.state.shouldPlay}
      //       resizeMode="cover"
      //       style={{ width, height: 300 }}
      //       isMuted={this.state.mute}
      //     />
      //     <View style={styles.controlBar}>
      //       <MaterialIcons
      //         name={this.state.mute ? "volume-mute" : "volume-up"}
      //         size={45}
      //         color="white"
      //         onPress={this.handleVolume}
      //       />
      //       <MaterialIcons
      //         name={this.state.shouldPlay ? "pause" : "play-arrow"}
      //         size={45}
      //         color="white"
      //         onPress={this.handlePlayAndPause}
      //       />
      //     </View>
      //   </View>
      // </View>
      // <WebView
      //   style={{ flex: 1, marginTop: 25 }}
      //   javaScriptEnabled={true}
      //   domStorageEnabled={true}
      //   source={{ uri: link }}
      // />
      // <VideoPlayer
      //   videoProps={{
      //     shouldPlay: true,
      //     resizeMode: Video.RESIZE_MODE_CONTAIN,
      //     source: {
      //       uri: link
      //     }
      //   }}
      //   isPortrait={true}
      //   playFromPositionMillis={0}
      //   playThroughEarpieceAndroid={true}
      // />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  controlBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
