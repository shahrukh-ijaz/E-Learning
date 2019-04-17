import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/exam.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Content, Title, Radio, Spinner } from "native-base";
import RadioGroup from "react-native-radio-buttons-group";
import { Header } from "react-native-elements";

export default class Exam extends Component {
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
      // console.log("Questions", responseJson.success.questions);
      if (responseJson.success) {
        this.setState({ questions: responseJson.success.questions });
        console.log(this.state.questions.length);
        this.setState({
          totalQuestions: this.state.questions.length - 1,
          index: 0
        });
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

  answerQuestion = async (answer, index) => {
    let ans = this.state.answers;
    ans[index] = answer;
    await this.setState({
      answers: ans
    });
    console.log(ans);
    // console.log(this.state);
  };

  evaluateQuiz = () => {
    let questions = this.state.questions;
    let answers = this.state.answers;
    let marks = 0;
    for (i = 0; i < this.state.answers.length; i++) {
      if (questions[i].answer == answers[i]) {
        marks++;
      }
    }
    if (this.state.index == this.state.totalQuestions) {
      return <Text>You obtained {marks} marks</Text>;
    } else {
      return null;
    }
  };

  getQuestion = (question, index) => {
    // console.log(question);
    if (question) {
      return (
        <React.Fragment key={question.id}>
          <Text style={{ fontSize: 16 }}>
            {"Q. " + question.question}
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
                    onPress={() => this.answerQuestion(opt.row, index)}
                    selected={
                      this.state.answers[index] == opt.row ? true : false
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
              title="Submit Answer"
              onPress={() =>
                index < this.state.totalQuestions
                  ? this.setState({ index: index + 1 })
                  : this.setState({ quizCompleted: true })
              }
            >
              <Text style={styles.buttonText}>Submit Answer</Text>
            </Button>
          </View>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  render() {
    let questions = this.getQuestion(
      this.state.questions[this.state.index],
      this.state.index
    );
    let result = this.evaluateQuiz();
    return (
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
        <View style={styles.questionView}>
          {this.state.isLoading ? (
            <Spinner />
          ) : this.state.quizCompleted ? (
            result
          ) : (
            questions
          )}
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
