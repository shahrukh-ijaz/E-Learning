import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/quiz.styles";
import CustomFooter from "../customComponents/footer";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    console.log("fetching quizes");
    try {
      let response = await fetch("https://www.gorporbyken.com/api/quiz", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      let responseJson = await response.json();
      console.log("QuizResponse", responseJson);
      if (responseJson.success) {
        // this.setState({ loginError: null, isLoading: false });
        // await AsyncStorage.setItem("authToken", responseJson.success.token);
        // await AsyncStorage.setItem("userName", responseJson.success.name);
        // this.props.navigation.navigate("Dashboard");
        console.log("QuizResponse", responseJson);
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

  render() {
    return (
      <React.Fragment>
        <View style={styles.instructionsView}>
          <Text style={styles.instructionsText}>
            Rule and Conditions For E-Exam{"\n\n"}
          </Text>
          <Text style={styles.instructionsText}>1. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>2. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>3. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>4. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>5. xxxxxxxxxx</Text>
        </View>
        <View style={styles.body} />
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
