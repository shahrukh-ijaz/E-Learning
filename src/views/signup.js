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
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            source={require("../../assets/signUp.png")}
          />
          
        </Container>

        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Input placeholder="Name" />
            </Item>
            <Item style={styles.inputFields}>
              <Input placeholder="Username" />
            </Item>
            <Item style={styles.inputFields}>
              <Input placeholder="Email" />
            </Item>
            <Item style={styles.inputFields}>
              <Input placeholder="Password" />
            </Item>
            <Item style={styles.inputFields}>
              <Input placeholder="Confirm Password" />
            </Item>
            <View style={styles.buttonView}>
              <Button style={[styles.button]}  onPress={()=>this.props.navigation.goBack()}>
                <Text style={{ color: "white" }}>Create Account</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </React.Fragment>
    );
  }
}
