import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  CardItem
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../styles/dashboard.styles";
import bookingETest from "./bookingETest";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            style={{ width: 180, height: 180 }}
            source={require("../../assets/avatar.png")}
          />
        </Container>

        <Container style={styles.surname}>
          <Text style={{ fontSize: 20, color: "gray" }}>SURNAME</Text>
        </Container>

        <Container style={styles.body}>
          <Content style={styles.content}>
            <View style={styles.buttonView}>
              <Button style={[styles.button]} onPress={() => this.props.navigation.navigate("bookingETest")}>
                <Text style={styles.buttonText}>Booking E-Test</Text>
              </Button>
            </View>
            <View style={styles.buttonView}>
              <Button style={[styles.button]} onPress={() => this.props.navigation.navigate("onlineLesson")}>
                <Text style={styles.buttonText}>Online Lesson</Text>
              </Button>
            </View>
            <View style={styles.buttonView}>
              <Button style={[styles.button]}>
                <Text style={styles.buttonText}>Quiz</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </React.Fragment>
    );
  }
}
