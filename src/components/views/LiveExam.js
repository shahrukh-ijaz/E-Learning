import React, { Component } from "react";
import { Text, View, AsyncStorage, ScrollView } from "react-native";
import { styles } from "../../styles/liveExam.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Radio, Spinner, Container } from "native-base";
import { Header } from "react-native-elements";

export default class LiveExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      index: null,
      totalQuestions: null,
      quizCompleted: false,
      isLoading: false
    };
  }

  async componentDidMount() {
    const authToken = await AsyncStorage.getItem("authToken");
    const {
      props: {
        navigation: {
          state: {
            params: { exam }
          }
        }
      }
    } = this;
    // console.log(id, type);
    this.setState({ isLoading: true });
    try {
      var formData = new FormData();
      formData.append("exam", exam.id);
      let examStartResponse = await fetch(
        `https://www.gorporbyken.com/api/exam/start`,
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
      let responseJson = await examStartResponse.json();
      if (responseJson.success) {
        let response = await fetch(
          `https://www.gorporbyken.com/api/exam/details?id=${exam.id}&level=1`,
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
        console.log("Questions", responseJson.success.portions);
        if (responseJson.success) {
          this.setState({
            portions: responseJson.success.portions,
            questions:
              responseJson.success.portions &&
              responseJson.success.portions[0].questions,
            portionIndex: 0,
            index: 0,
            isLoading: false
          });
          console.log(this.state.questions.length);
        } else {
          // this.setState(() => ({
          //   loginError: "Email or Password doesn't match",
          //   isLoading: false
          // }));
        }
      }
    } catch (error) {
      console.log("error", error);
      // this.props.navigation.navigate("Signin");
    }
  }

  answerQuestion = async (answer, index, questionId) => {
    let ans = this.state.answers;
    ans.push({ [questionId]: answer });
    await this.setState({
      answers: ans
    });
    console.log(ans);
    // console.log(this.state);
  };

  // evaluateQuiz = () => {
  //   let questions = this.state.questions;
  //   let answers = this.state.answers;
  //   let marks = 0;
  //   for (i = 0; i < this.state.answers.length; i++) {
  //     if (questions[i].answer == answers[i]) {
  //       marks++;
  //     }
  //   }
  //   if (this.state.index == this.state.totalQuestions) {
  //     return <Text>You obtained {marks} marks</Text>;
  //   } else {
  //     return null;
  //   }
  // };

  getQuestion = (question, index) => {
    // console.log(question);
    let qNo = index + 1;
    if (question) {
      return (
        <React.Fragment key={question.id}>
          <Text style={{ fontSize: 16 }}>
            {"Q." + qNo + " " + question.question}
            {"\n\n Answers: \n"}
          </Text>
          {question.options.map(opt => {
            return (
              <React.Fragment key={opt.id}>
                <View style={{ flexDirection: "row" }}>
                  <Radio
                    id={opt.row + question.id}
                    key={opt.id}
                    style={{ flex: 1 }}
                    onPress={() =>
                      this.answerQuestion(opt.row, index, question.id)
                    }
                    selected={
                      this.state.answers.length &&
                      this.state.answers[this.state.answers.length - 1][
                        question.id
                      ] == opt.row
                        ? true
                        : false
                    }
                  />
                  <Text style={{ flex: 7 }}>{opt.option}</Text>
                </View>
              </React.Fragment>
            );
          })}
          <View style={styles.buttonView}>
            <Button
              style={styles.button}
              key={question.id}
              title="Next"
              onPress={() => this.setState({ index: index + 1 })}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Button>
          </View>
        </React.Fragment>
      );
    } else {
      return (
        <Button
          style={styles.button}
          title="Next Portion"
          onPress={this._handlePortionComplete}
        >
          <Text style={styles.buttonText}>Next Portion</Text>
        </Button>
      );
    }
  };

  _handlePortionComplete = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    const {
      props: {
        navigation: {
          state: {
            params: { exam }
          }
        }
      }
    } = this;
    // console.log(id, type);
    this.setState({ isLoading: true });
    try {
      var formData = new FormData();
      formData.append("exam", exam.id);
      formData.append("portion", this.state.portionIndex + 1);
      formData.append("questions", this.state.answers);
      let response = await fetch(`https://www.gorporbyken.com/api/exam/save`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`
        },
        body: formData
      });
      let responseJson = await response.json();
      console.log("Questions", responseJson);
      // portions: responseJson.success.portions,
      // questions: responseJson.success.portions && responseJson.success.portions[0].questions,
      // portionIndex: 0,
      // index: 0,
      if (responseJson.success) {
        this.setState({
          isLoading: false
        });
      } else {
        // this.setState(() => ({
        //   loginError: "Email or Password doesn't match",
        //   isLoading: false
        // }));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    let questions = this.getQuestion(
      this.state.questions[this.state.index],
      this.state.index
    );
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
        <View style={styles.instructionView}>
          <Text style={{ fontSize: 16 }}>
            Carefuly read these instructions before starting the exam!
          </Text>
        </View>
        <View style={styles.questionView}>{questions}</View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
