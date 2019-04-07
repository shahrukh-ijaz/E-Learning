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
import { styles } from "../styles/signup.styles";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  _signup = async () => {
    console.log(this.state);
    if (this.state.name.length < 1) {
      this.setState(() => ({ nameError: "First name is required." }));
    } else {
      this.setState(() => ({ nameError: null }));
      if (this.state.email.trim() === "") {
        this.setState(() => ({ emailError: "Email is required." }));
      } else {
        this.setState(() => ({ emailError: null }));
        if (this.state.password.length < 6) {
          this.setState(() => ({
            passwordError: "Password should atleast be 6 characters long "
          }));
        } else {
          this.setState(() => ({ passwordError: null }));
          if (this.state.password.localeCompare(password_confirmation)) {
            this.setState(() => ({
              confirmPasswordError: "Password don't match"
            }));
          } else {
            this.setState(() => ({ confirmPasswordError: null }));

            try {
              let x = await fetch("https://www.gorporbyken.com/api/register", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: this.state.email,
                  name: this.state.name,
                  password: this.state.password,
                  password_confirmation: this.state.password_confirmation
                })
              });
              if (x.success.token) {
                console.log("token", token);
              }
            } catch (error) {
              console.log("error", error);
            }
          }
        }
      }
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

        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Input
                placeholder="Full Name"
                onChangeText={name => this.setState({ name })}
              />
            </Item>
            {!!this.state.nameError && (
              <Text style={{ color: "red" }}>{this.state.nameError}</Text>
            )}
            <Item style={styles.inputFields}>
              <Input
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            {!!this.state.emailError && (
              <Text style={{ color: "red" }}>{this.state.emailError}</Text>
            )}
            <Item style={styles.inputFields}>
              <Input
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            {!!this.state.passwordError && (
              <Text style={{ color: "red" }}>{this.state.passwordError}</Text>
            )}
            <Item style={styles.inputFields}>
              <Input
                placeholder="Confirm Password"
                onChangeText={password_confirmation =>
                  this.setState({ password_confirmation })
                }
              />
            </Item>
            {!!this.state.confirmPasswordError && (
              <Text style={{ color: "red" }}>
                {this.state.confirmPasswordError}
              </Text>
            )}
            <View style={styles.buttonView}>
              <Button style={[styles.button]} onPress={() => this._signup()}>
                <Text style={{ color: "white" }}>Create Account</Text>
              </Button>
            </View>
          </Content>
        </Container>
        <Container style={styles.footer}>
          <View style={styles.buttonView}>
            <Button
              style={styles.signupButton}
              onPress={() => this.props.navigation.navigate("Signin")}
            >
              <Text style={{ color: "#012060", fontSize: 18 }}>Sign In</Text>
            </Button>
          </View>
        </Container>
      </React.Fragment>
    );
  }
}
