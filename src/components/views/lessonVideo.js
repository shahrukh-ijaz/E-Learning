import React, { Component } from "react";
import { WebView } from "react-native";

export default class LessonVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      props: {
        navigation: {
          state: {
            params: { link }
          }
        }
      }
    } = this;

    return (
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        source={{ uri: link }}
      />
      // <VideoPlayer
      //   videoProps={{
      //     shouldPlay: true,
      //     resizeMode: Video.RESIZE_MODE_CONTAIN,
      //     source: {
      //       uri: "https://www.youtube.com/watch?v=dyi-Qh_HeTI"
      //     }
      //   }}
      //   isPortrait={true}
      //   playFromPositionMillis={0}
      //   playThroughEarpieceAndroid={true}
      // />
    );
  }
}
