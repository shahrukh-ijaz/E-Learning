import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  CardItem,
  Title,
  List,
  ListItem,
  SwipeRow
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../../styles/afterLevel.styles";
import Swiper from "react-native-swiper";
import { CheckBox } from "react-native-elements";
export default class afterLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header style={{ paddingTop: 30, flex: 1 }} />
        <View style={styles.textView}>
          <Text>
            BOOKING E-EXAM{"\n"}Plaese select the E-Exam round{"\n"}Select only
            one round{"\n"}per E-Exam set
          </Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>E-Exam SET 1</Text>
        </View>
        <View style={styles.body}>
          <Swiper>
            <View style={{ flex: 1 }}>
              <Text style={styles.bodyHeading}>Date: 25th May 2019</Text>
              <CheckBox
                checked={this.state.checkbox1}
                onPress={() =>
                  this.setState({ checkbox1: !this.state.checkbox1 })
                }
                style={styles.checkBox}
                title="Round 1: 9:00-11:50"
              />
              <CheckBox style={styles.checkBox} title="Round 2: 13:00-15:50" />
              <Text style={styles.bodyHeading}>Date: 26th May 2019</Text>
              <CheckBox style={styles.checkBox} title="Round 1: 9:00-11:50" />
              <CheckBox style={styles.checkBox} title="Round 2: 13:00-15:50" />
            </View>
            <View style={{ flex: 1 }} />
          </Swiper>
        </View>
      </React.Fragment>
    );
  }
}
