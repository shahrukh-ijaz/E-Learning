import React, { Component } from "react";
import { Container, Header, Content, Item, Input, Button, CardItem, Image } from 'native-base';
import { StyleSheet, Text, View } from "react-native";
import {styles} from "../styles/signup.styles";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
            <Text>This is Header</Text>
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
            <Button style={[styles.inputFields , {width: 320}]}> 
              <Text style={styles.button}>
                Create Account
              </Text>
            </Button>
          </Content>
        </Container>
      </React.Fragment>  
    );
  }
}
