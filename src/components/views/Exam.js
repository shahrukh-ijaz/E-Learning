import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/exam.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Content, Title } from "native-base";
import RadioGroup from "react-native-radio-buttons-group";

export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          label: "Option 1"
        },
        {
          label: "Option 2"
        },
        {
          label: "Option 3"
        },
        {
          label: "Option 4"
        }
      ]
    };
  }

  onPress = questions => this.setState({ questions });

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
        <View style={styles.instructionView}>
          <Text style={{ fontSize: 16 }}>
            Carefuly read these instructions before starting the exam!
          </Text>
        </View>
        <View style={styles.questionView}>
          <Text style={{ fontSize: 16 }}>
            what is the correct answer to this question?{"\n\n"}
          </Text>
          <RadioGroup
            style={{ fontSize: 16 }}
            radioButtons={this.state.questions}
            onPress={this.onPress}
          />
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
