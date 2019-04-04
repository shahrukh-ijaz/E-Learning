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
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            style={{ width: 360, height: 200 }}
            source={require("../../assets/signUp.png")}
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
              <Item style={styles.inputFields}>
                <Input
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                />
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
              <Text style={{ color: "grey", fontSize: 18 }}>
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
