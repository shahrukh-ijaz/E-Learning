import React, { Component } from "react";
import { Text, View, AsyncStorage, ScrollView } from "react-native";
import { styles } from "../../styles/liveExam.styles";
import CustomFooter from "../customComponents/footer";
import { Button, Radio, Spinner, Container, Title } from "native-base";
import { Header } from "react-native-elements";

export default class LiveExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: [],
      index: null,
      totalQuestions: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    let authToken = await AsyncStorage.getItem("authToken");
    const {
      props: {
        navigation: {
          state: {
            params: { exam }
          }
        }
      }
    } = this;
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
      this.newMethod()("1st request", responseJson);
      if (responseJson.success) {
        console.log("Getting Exam", exam);
        try {
          let response = await fetch(
            `https://www.gorporbyken.com/api/exam/details?id=${
              exam.id
            }&level=1`,
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
          console.log("2nd request", responseJsone);
          if (responseJson.success) {
            this.setState({
              portions: responseJson.success.portions,
              questions: responseJson.success.portions[0].questions,
              portionIndex: 0,
              index: 0,
              isLoading: false
            });
            console.log(this.state.questions.length);
          } else {
            if (responseJson.error == "already completed") {
              alert("You have already given this exam! Proceed to Dashboard");
              this.props.navigation.navigate("BookingETest");
            }
          }
        } catch (error) {
          alert("Error: " + error);
        }
      } else {
        if (responseJson.error == "already completed") {
          alert("You have already given this exam! Proceed to Dashboard");
          this.props.navigation.navigate("BookingETest");
        }
      }
    } catch (error) {
      this.setState({isLoading:false});
      alert("There is some issue with network. Try later!");
      this.props.navigation.navigate("Dashboard");
      console.log("error", error);
      // this.props.navigation.navigate("Signin");
    }
  }

  answerQuestion = async (answer, index, questionId) => {
    let ans = this.state.answers;
    ans.push({ [questionId]: answer });
    this.setState({
      answers: ans
    });
    console.log(ans);
    // console.log(this.state);
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
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            title="Next Portion"
            onPress={this._handlePortionComplete}
          >
            <Text style={styles.buttonText}>Next Portion</Text>
          </Button>
        </View>
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
      for (i = 0; i < this.state.answers.length; i++) {
        formData.append(
          "questions[" + this.state.questions[i].id + "]",
          this.state.answers[i][this.state.questions[i].id]
        );
      }
      // console.log(formData);
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
      if (responseJson.success) {
        if (this.state.portionIndex != this.state.portions.length - 1) {
          this.setState({
            questions: this.state.portions[this.state.portionIndex+1].questions,
            portionIndex: this.state.portionIndex + 1,
            answers: [],
            index: 0,
            isLoading: false
          });
        } else {
          this.setState({
            finishedExam: true,
            examResult: responseJson.success,
            isLoading: false
          });
          console.log("Exam Result", responseJson);
        }
      } else {
        // this.setState(() => ({
        //   loginError: "Email or Password doesn't match",
        //   isLoading: false
        // }));
      }
    } catch (error) {
      alert("There is some issue with server. Please try again later!");
      this.props.navigation.navigate('Dashboard');
      console.log("error", error);
    }
  };

  _calculateResult = () => {
    return (
      <React.Fragment>
        {this.state.examResult.level ? (
          <Text>Exam level: {this.state.examResult.level}</Text>
        ) : null}
        {this.state.examResult.portion1 ? (
          <Text>Portion 1:  {this.state.examResult.portion1==1?"Completed":"Incompleted"}</Text>
        ) : null}
        {this.state.examResult.portion2 ? (
          <Text>Portion 2: {this.state.examResult.portion2==1?"Completed":"Incompleted"}</Text>
        ) : null}
        {this.state.examResult.total ? (
          <Text>Total Marks: {this.state.examResult.total}</Text>
        ) : null}
        {this.state.examResult.score ? (
          <Text>Obtained Marks: {this.state.examResult.score}</Text>
        ) : null}
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Dashboard")}
            title="Proceed to Dashboard"
          >
            <Text style={styles.buttonText}>Proceed to Dashboard</Text>
          </Button>
        </View>
      </React.Fragment>
    );
  };

  newMethod() {
    return console.log;
  }

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
        {this.state.finishedExam ? (
          <React.Fragment>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ fontSize: 18 }}>Exam Result</Text>
              {this._calculateResult()}
            </View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <View style={styles.instructionView}>
              <Text style={{ fontSize: 16 }}>
                Carefuly read these instructions before starting the exam!
              </Text>
            </View>
            <View style={styles.questionView}>{questions}</View>
          </React.Fragment>
        )}
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
