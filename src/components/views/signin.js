import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Spinner,
  Button
} from "native-base";
import { styles } from "../../styles/signin.styles";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  _signin = async () => {
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
        this.setState({ isLoading: true });
        try {
          let response = await fetch("https://www.gorporbyken.com/api/login", {
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
          let responseJson = await response.json();
          if (responseJson.success) {
            this.setState(() => ({ loginError: null, isLoading: false }));
            this.props.navigation.navigate("dashboard");
            console.log("token", responseJson.success.token);
          } else {
            this.setState(() => ({
              loginError: "Email or Password doesn't match",
              isLoading: false
            }));
          }
        } catch (error) {
          console.log("error", error);
          this.setState(() => ({
            loginError: "Email or Password doesn't match",
            isLoading: false
          }));
        }
      }
    }
  };

  render() {
    return this.state.isLoading ? (
      <Container
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Spinner />
      </Container>
    ) : (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={require("../../../assets/logo.jpeg")}
          />
        </Container>

        <Container style={styles.body}>
          <Container style={styles.container}>
            <Content style={styles.content}>
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
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              {!!this.state.passwordError && (
                <Text style={{ color: "red" }}>{this.state.passwordError}</Text>
              )}
              {!!this.state.loginError && (
                <Text style={{ color: "red" }}>{this.state.loginError}</Text>
              )}

              <View style={styles.buttonView}>
                <Button style={[styles.button]} onPress={() => this._signin()}>
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
