import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  CardItem,
  Spinner
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../../styles/profile.styles";
import CustomFooter from "../customComponents/footer";

export default class Profile extends Component {
  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={require("../../../assets/avatar.png")}
          />
        </Container>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 22 }}>Full Name</Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 22 }}>Email</Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 22 }}>Username</Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 22 }}>Registration no: 8106310</Text>
            </Item>
          </Content>
        </Container>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
