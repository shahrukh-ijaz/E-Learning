import React, { Component } from "react";
import { Container, Content, Item, Button, Icon, Spinner, Input } from "native-base";
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

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  // async componentDidMount() {
  //   const authToken = await AsyncStorage.getItem("authToken");
  //   try {
  //     let response = await fetch(
  //       "https://www.gorporbyken.com/api/user/details",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authToken}`
  //         }
  //       }
  //     );
  //     let responseJson = await response.json();
  //     // console.log("Profile", responseJson);
  //     console.log("responseJson.success",responseJson.success);

  //     if (responseJson.success) {
  //       await AsyncStorage.setItem("userName", responseJson.success.name);
  //       this.setState({ user: responseJson.success, isLoading: false });
  //       AsyncStorage.setItem("Member", responseJson.success.paid);
  //     } else {
  //       // this.setState(() => ({
  //       //   loginError: "Email or Password doesn't match",
  //       //   isLoading: false
  //       // }));
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     this.props.navigation.navigate("Signin");
  //   }
  // }

  // _requestCameraPermission = async () => {
  //   const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   console.log("status",status.status);
  //   this.setState({
  //     hasCameraPermission: status.status === 'granted'
  //   })
  // }

  // _changeProfile = async () => {
  //   console.log("image picker");
  //   await this._requestCameraPermission();
  //     console.log("hasCameraPermission",this.state.hasCameraPermission)
  //     let result = await ImagePicker.launchImageLibraryAsync();
  
  //     console.log(result);
  
  //     if (!result.cancelled) {
  //       this.setState({
  //         photo: result.uri
  //       }, async () => {
  //         var formData = new FormData();
  //         formData.append("image", {type: result.type,uri: result.uri});
  //         console.log("formData", formData);
  //         const authToken = await AsyncStorage.getItem("authToken");
  //         const response = await fetch(
  //           "https://www.gorporbyken.com/api/user/update-profle-photo",
  //           {
  //             method: "POST",
  //             headers: {
  //               Accept: "application/json",
  //               "Content-Type": "multipart/form-data",
  //               Authorization: `Bearer ${authToken}`
  //             },
  //             body: formData
  //           }
  //         );
  //         const responseJson = await response.json();
  //         console.log("responseJson", responseJson);
  //       });
  //     }
    
  // };

  _changePasswordRequest = async () => {
    if(this.state.newPassword === this.state.confirmPassword && this.state.newPassword.length >= 8){
      const authToken = await AsyncStorage.getItem("authToken");
      var formData = new FormData();
      formData.append("old_password",this.state.oldPassword );
      formData.append("password",this.state.newPassword );
      formData.append("password_confirmation",this.state.confirmPassword );
      console.log("formData", formData);
      const response = await fetch(
        "https://www.gorporbyken.com/api/user/change-password",
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

      if(responseJson.success){
        alert('Password Changed Successfully');
        this.props.navigation.navigate('Profile');
      }else if(responseJson.error){
        alert(responseJson.error);
      }
    }
    else{
      alert("Password length should be greater than 8 characters or your new Password and Confirm Password does'nt match")
    }
  }

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
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "white" }}>Old Password: </Text>
              <Input
                secureTextEntry={true}
                style={{ fontSize: 20, color: "white" }}
                placeholder="Old Password"
                onChangeText={oldPassword => this.setState({ oldPassword })}
              />
            </Item>
            <Item style={styles.inputFields}>
              <Text style={{ fontSize: 20, color: "white" }}>New Password: </Text>
              <Input
                secureTextEntry={true}
                style={{ fontSize: 20, color: "white" }}
                placeholder="New Password"
                onChangeText={newPassword => this.setState({ newPassword })}
              />
            </Item>
            <Item style={styles.inputFields}>
            <Text style={{ fontSize: 20, color: "white" }}>Confirm Password: </Text>
              <Input
                secureTextEntry={true}
                style={{ fontSize: 20, color: "white" }}
                placeholder="Confirm Password"
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
              />
            </Item>
          </Content>
          <View style={styles.buttonView}>
            <Button
              style={[styles.button]}
              onPress={this._changePasswordRequest}
            >
              <Text style={styles.buttonText}>
                Change Password
              </Text>
            </Button>
          </View>
        </Container>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
