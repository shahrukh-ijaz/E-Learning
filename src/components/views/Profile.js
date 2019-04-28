import React, { Component } from "react";
import { Container, Content, Item, Button, Icon, Spinner } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  Linking,
  TouchableOpacity
} from "react-native";
import { styles } from "../../styles/profile.styles";
import CustomFooter from "../customComponents/footer";
import { Header } from "react-native-elements";
import { ImagePicker, Permissions } from 'expo';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        name: "",
        isLoading: true,
        photo: null
      },
      hasCameraPermission: false
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
      // console.log("responseJson.success",responseJson.success);

      if (responseJson.success) {
        await AsyncStorage.setItem("userName", responseJson.success.name);
        this.setState({ user: responseJson.success, isLoading: false });
        AsyncStorage.setItem("Member", responseJson.success.paid);
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

  _requestCameraPermission = async () => {
    const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log("status",status.status);
    this.setState({
      hasCameraPermission: status.status === 'granted'
    })
  }

  _changeProfile = async () => {
    console.log("image picker");
    await this._requestCameraPermission();
      console.log("hasCameraPermission",this.state.hasCameraPermission)
      let result = await ImagePicker.launchImageLibraryAsync();
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({
          photo: result.uri
        }, async () => {
          var formData = new FormData();
          formData.append("image", {type: result.type,uri: result.uri});
          console.log("formData", formData);
          const authToken = await AsyncStorage.getItem("authToken");
          const response = await fetch(
            "https://www.gorporbyken.com/api/user/update-profle-photo",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${authToken}`
              },
              body: formData
            }
          );
          const responseJson = await response.json();
          console.log("responseJson", responseJson);
        });
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
        <Header
          containerStyle={{ backgroundColor: "#012060" }}
          centerComponent={{
            text: "GOR. POR. By KEN",
            style: { color: "yellow", fontSize: 28 }
          }}
        />
        <Container style={styles.header}>
          <TouchableOpacity onPress={this._changeProfile}>
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{uri:this.state.photo}}
            />
          </TouchableOpacity>
        </Container>
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "white" }}>Name: </Text>
              <Text style={{ fontSize: 22, color: "white" }}>
                {this.state.user.name}
              </Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "white" }}>Email: </Text>
              <Text style={{ fontSize: 22, color: "white" }}>
                {this.state.user.email}
              </Text>
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "white" }}>Membership: </Text>
              <Text style={{ fontSize: 22, color: "white" }}>
                {this.state.user.paid == 0 ? "Free" : "Premium"}
              </Text>
            </Item>
            <Item style={styles.inputFields}>
            <Button
                style={[styles.button]}
                onPress={() =>
                  this.props.navigation.navigate('ChangePassword')
                }
              >
                <Text style={styles.buttonText}>
                  Change Password
                </Text>
              </Button>
            </Item>
          </Content>
          {this.state.user.paid ? (
            <View style={styles.buttonView}>
              <Button
                style={[styles.button]}
                onPress={() =>
                  Linking.openURL("https://gorporbyken.com/payment")
                }
              >
                <Text style={styles.buttonText}>
                  <Icon style={styles.buttonText} name="ios-cash" />
                  {"  "}
                  Get Premium!
                </Text>
              </Button>
            </View>
          ) : null}
        </Container>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
