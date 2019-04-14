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
import { styles } from "../../styles/dashboard.styles";
import { AsyncStorage } from "react-native";
import CustomFooter from "../customComponents/footer";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      name: ""
    };
  }

  async componentDidMount() {
    name = await AsyncStorage.getItem("userName");
    // console.log("name", name);
    this.setState({
      name: name
    });
  }
  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            style={{ width: 180, height: 180 }}
            source={require("../../../assets/avatar.png")}
          />
        </Container>

        <Container style={styles.surname}>
          <Text style={{ fontSize: 20, color: "gray" }}>{this.state.name}</Text>
        </Container>

        <Container style={styles.body}>
          <Content style={styles.content}>
            <View style={styles.buttonView}>
              <Button
                style={[styles.button]}
                onPress={() => this.props.navigation.navigate("BookingETest")}
              >
                <Text style={styles.buttonText}>Booking E-Test</Text>
              </Button>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={[styles.button]}
                onPress={() => this.props.navigation.navigate("OnlineLesson")}
              >
                <Text style={styles.buttonText}>Online Lesson</Text>
              </Button>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={[styles.button]}
                onPress={() => this.props.navigation.navigate("Quiz")}
              >
                <Text style={styles.buttonText}>Quiz</Text>
              </Button>
            </View>
          </Content>
        </Container>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
