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
import { styles } from "../styles/level.styles";
import Swiper from "react-native-swiper";

export default class level extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header style={{ flex: 1, paddingTop: 30 }} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>PLEASE SELECT YOUR LEVEL</Text>
        </View>
        <View style={styles.body}>
          <List>
            <ListItem
              style={styles.itemView}
              onPress={() => this.props.navigation.navigate("afterLevel")}
            >
              <Text style={styles.itemText}>LEVEL 1</Text>
            </ListItem>
            <ListItem style={styles.itemView}>
              <Text style={styles.itemText}>LEVEL 1</Text>
            </ListItem>
            <ListItem style={styles.itemView}>
              <Text style={styles.itemText}>LEVEL 1</Text>
            </ListItem>
            <ListItem style={styles.itemView}>
              <Text style={styles.itemText}>LEVEL 1</Text>
            </ListItem>
          </List>
        </View>
      </React.Fragment>
    );
  }
}
