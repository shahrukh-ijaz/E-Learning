import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button
} from "native-base";
import { styles } from "../styles/signin.styles";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _signin = async () => {
    try {
      let x = await fetch("https://www.gorporbyken.com/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      });
      if (x.success.token) {
        console.log("token", token);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/logo.jpeg")}
          />
        </Container>

        <Container style={styles.body}>
          <Container style={styles.container}>
            <Content style={styles.content}>
              <Item style={styles.inputFields}>
                <Input placeholder="Username" />
              </Item>
              <Item style={styles.inputFields}>
                <Input placeholder="Password" />
              </Item>

              <View style={styles.buttonView}>
                <Button
                  style={[styles.button]}
                  onPress={() => this.props.navigation.navigate("Dashboard")}
                >
                  <Text style={{ color: "white" }}>Sign In</Text>
                </Button>
              </View>

              <View
                style={styles.inputFields}
                style={styles.forgotPasswordView}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </View>
            </Content>
          </Container>
        </Container>

        <Container style={styles.footer}>
          <View style={styles.buttonView}>
            <Button
              style={styles.signupButton}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={{ color: "#012060", fontSize: 18 }}>
                Create Account
              </Text>
            </Button>
          </View>
        </Container>
      </React.Fragment>
    );
  }
}

export default Signin;
