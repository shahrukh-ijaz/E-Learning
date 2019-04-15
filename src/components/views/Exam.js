import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/quiz.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Content, Title } from "native-base";

export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    const {
      props: {
        navigation: {
          state: {
            params: { id, type }
          }
        }
      }
    } = this;
    // console.log(id, type);
    try {
      let response = await fetch(
        "https://www.gorporbyken.com/api/quiz/details?id=" + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      let responseJson = await response.json();
      console.log("Quizes", responseJson.success.questions);
      if (responseJson.success) {
        this.setState({ questions: responseJson.success.questions });
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
    // let quizes = this.state.quizes.map(quiz => {
    //   return (
    //     <View key={quiz.id} style={styles.buttonView}>
    //       <Button
    //         style={[styles.button]}
    //         onPress={() =>
    //           this.props.navigation.navigate("Exam", {
    //             id: quiz.id,
    //             type: "quiz"
    //           })
    //         }
    //       >
    //         <Text style={styles.buttonText}>{quiz.name}</Text>
    //       </Button>
    //     </View>
    //   );
    // });
    return (
      <React.Fragment>
        <View style={styles.body}>
          <Text>Take Quiz</Text>
          {/* <Content style={styles.content}>{quizes}</Content> */}
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
