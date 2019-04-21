import React, { Component } from "react";
import { Container, Content, Item, Button, Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Linking
} from "react-native";
import { styles } from "../../styles/profile.styles";
import CustomFooter from "../customComponents/footer";
import { Header } from "react-native-elements";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        name: ""
      }
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    try {
      let response = await fetch(
        "https://www.gorporbyken.com/api/user/details",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      let responseJson = await response.json();
      // console.log("Profile", responseJson);
      if (responseJson.success) {
        this.setState({ user: responseJson.success });
        await AsyncStorage.setItem("Member", responseJson.success.paid);
      } else {
        // this.setState(() => ({
        //   loginError: "Email or Password doesn't match",
        //   isLoading: false
        // }));
      }
    } catch (error) {
      console.log("error", error);
      this.props.navigation.navigate("Signin");
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          containerStyle={{ backgroundColor: "#012060" }}
          centerComponent={{
            text: "GOR. POR. By KEN",
            style: { color: "yellow", fontSize: 28 }
          }}
        />
        <Container style={styles.header}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={require("../../../assets/avatar.png")}
          />
        </Container>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "#012060" }}>Name: </Text>
              <Text style={{ fontSize: 22, color: "#012060" }}>
                {this.state.user.name}
              </Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "#012060" }}>Email: </Text>
              <Text style={{ fontSize: 22, color: "#012060" }}>
                {this.state.user.email}
              </Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "#012060" }}>
                Membership:{" "}
              </Text>
              <Text style={{ fontSize: 22, color: "#012060" }}>
                {this.state.user.paid == 0 ? "Free" : "Premium"}
              </Text>
            </Item>
          </Content>
          <View style={styles.buttonView}>
            <Button
              style={[styles.button]}
              onPress={() => Linking.openURL("https://gorporbyken.com/payment")}
            >
              <Text style={styles.buttonText}>
                <Icon style={styles.buttonText} name="ios-cash" />
                {"  "}
                Get Premium!
              </Text>
            </Button>
          </View>
        </Container>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
