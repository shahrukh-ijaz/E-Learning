import React , { Component } from 'react';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

export default class LessonVideo extends Component {
  constructor(props){
    super(props);
    console.log("this.propse",this.props.navigation.state.params.source);
    this.state = {}
  }

  render(){
    const {
      props:{
        navigation: {
          state: {
            params: {
              link
            }
          }
        }
      }
    } = this;

    console.log("this.props.source",link);

    return (
      // <Video
      //   source={{ uri: 'https://www.youtube.com/embed/r7CWEE3ZAWs' }}
      //   rate={1.0}
      //   volume={1.0}
      //   isMuted={false}
      //   resizeMode="cover"
      //   shouldPlay
      //   isLooping
      //   style={{ width: 300, height: 300 }}
      // />
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: 'https://www.youtube.com/watch?v=dyi-Qh_HeTI',
          },
        }}
        isPortrait={true}
        playFromPositionMillis={0}
        playThroughEarpieceAndroid={true}
      />
    )
  }
}