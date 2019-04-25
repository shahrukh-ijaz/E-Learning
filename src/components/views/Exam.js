import React, { Component } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/exam.styles";
import CustomFooter from "../customComponents/footer";
import {
  Button,
  Radio,
  Spinner,
  List,
  ListItem,
  Content,
  Container
} from "native-base";

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
    this.setState({ isLoading: true });
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
      console.log("Questions", responseJson.success.questions);
      if (responseJson.success) {
        this.setState({ questions: responseJson.success.questions });
        console.log(this.state.questions.length);
        this.setState({
          totalQuestions: this.state.questions.length - 1,
          index: 0,
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
              <Text style={styles.buttonText}>Next</Text>
            </Button>
          </View>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  generateQuizKey = () => {
    let result = this.evaluateQuiz();
    let { answers, questions } = this.state;
    let keyView = (
      // <View style={{ flexDirection: "column", flex: 5 }}>
      <View>
        {result}
        <Content>
          <List>
            {questions.map(function(question, i) {
              return (
                <ListItem
                  key={question.id}
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "space-between"
                  }}
                >
                  <Text key={question.question}>
                    Question: {question.question}
                  </Text>
                  <Text key={answers[i]}>Answer: {answers[i]}</Text>
                  <Text key={question.id}>Correct: {question.answer}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </View>
    );
    return keyView;
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
        <View style={styles.questionView}>
          {this.state.quizCompleted ? this.generateQuizKey() : questions}
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
