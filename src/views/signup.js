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
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container style={styles.header}>
          <Image style ={{width:180,height:180}}
            source={require("../../assets/avatar.png")}
          />
          
        </Container>

        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Input  placeholder="Name" 
                      onChangeText = {name =>this.setState({name})}/>
            </Item>
            <Item style={styles.inputFields}>
              <Input  placeholder="Username" 
                      onChangeText = {username =>this.setState({username})}/>
            </Item>
            <Item style={styles.inputFields}>
              <Input  placeholder="Email" 
                      onChangeText = {email =>this.setState({email})}/>
            </Item>
            <Item style={styles.inputFields}>
              <Input  placeholder="Password" 
                      onChangeText = {password =>this.setState({password})}
                      secureTextEntry={true}/>
            </Item>
            <Item style={styles.inputFields}>
              <Input  placeholder="Confirm Password" 
                      onChangeText = {confirmPassword =>this.setState({confirmPassword})}
                      secureTextEntry={true}/>
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
