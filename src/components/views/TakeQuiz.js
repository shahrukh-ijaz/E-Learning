import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/quiz.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Content } from "native-base";

export default class TakeQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizes: []
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    const {
      props: {
        navigation: {
          state: {
            params: { id }
          }
        }
      }
    } = this;

    console.log("Quiz Category ID", id);
    // try {
    //   let response = await fetch(
    //     "https://www.gorporbyken.com/api/quiz-category",
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authToken}`
    //       }
    //     }
    //   );
    //   let responseJson = await response.json();
    //   console.log("QuizResponse", responseJson);
    //   if (responseJson.success) {
    //     console.log("QuizResponse", responseJson);
    //     this.setState({ quizes: responseJson.success });
    //   } else {
    //     // this.setState(() => ({
    //     //   loginError: "Email or Password doesn't match",
    //     //   isLoading: false
    //     // }));
    //   }
    // } catch (error) {
    //   console.log("error", error);
    //   this.props.navigation.navigate("Signin");
    // }
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.instructionsView}>
          <Text style={styles.instructionsText}>
            Rule and Conditions For Quizes{"\n\n"}
          </Text>
          <Text style={styles.instructionsText}>1. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>2. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>3. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>4. xxxxxxxxxx</Text>
          <Text style={styles.instructionsText}>5. xxxxxxxxxx</Text>
        </View>
        <View style={styles.body}>
          {/* <Content style={styles.content}>{quizCategories}</Content> */}
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
