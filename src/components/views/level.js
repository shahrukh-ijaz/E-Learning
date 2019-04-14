import React, { Component } from "react";
import {
  Header,  
  List,
  ListItem
} from "native-base";
import {  Text, View } from "react-native";
import { styles } from "../../styles/level.styles";
import Swiper from "react-native-swiper";


export default class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const {
      props:{
        navigation: {
          state: {
            params: {
              exam
            }
          }
        }
      }
    } = this;
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
              onPress={() => this.props.navigation.navigate("AfterLevel",{level: 1,exam:exam})}
            >
              <Text style={styles.itemText}>LEVEL 1</Text>
            </ListItem>
            <ListItem style={styles.itemView} onPress={() => this.props.navigation.navigate("AfterLevel",{level: 2,exam})}>
              <Text style={styles.itemText}>LEVEL 2</Text>
            </ListItem>
            <ListItem style={styles.itemView} onPress={() => this.props.navigation.navigate("AfterLevel",{level: 3,exam})}>
              <Text style={styles.itemText}>LEVEL 3</Text>
            </ListItem>
            <ListItem style={styles.itemView} onPress={() => this.props.navigation.navigate("AfterLevel",{level: 4,exam})}>
              <Text style={styles.itemText}>LEVEL 4</Text>
            </ListItem>
          </List>
        </View>
      </React.Fragment>
    );
  }
}
