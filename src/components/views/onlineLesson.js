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
  ListItem
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../../styles/onlineLesson.styles";

export default class onlineLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Header style={styles.header} />

        <View style={styles.titleView}>
          <Text style={styles.title}>ONLINE LESSONS</Text>
        </View>

        <View style={styles.body}>
          <Content>
            <List>
              <ListItem itemHeader first style={styles.itemHeader}>
                <Text style={styles.itemHeaderText}>Download Document</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Export E-Book</Text>
              </ListItem>
              <ListItem itemHeader style={styles.itemHeader}>
                <Text style={styles.itemHeaderText}>Chapter 1: xxxxxxxxxx</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
              <ListItem itemHeader style={styles.itemHeader}>
                <Text style={styles.itemHeaderText}>Chapter 2: xxxxxxxxxx</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Description</Text>
              </ListItem>
            </List>
          </Content>
        </View>
      </React.Fragment>
    );
  }
}
