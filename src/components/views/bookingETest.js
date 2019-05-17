import React, { Component } from "react";
import { Button, Spinner, Container } from "native-base";
import { Text, View, AsyncStorage, Alert } from "react-native";
import { styles } from "../../styles/bookingETest.styles";
import Swiper from "react-native-swiper";
import CustomFooter from "../customComponents/footer";
import { Header } from "react-native-elements";
import TimerCountdown from "react-native-timer-countdown";
import moment from "moment";

export default class BookingETest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: null,
      bookedExams: null,
      isLoading: false
    };
  }
  async componentDidMount() {
    let m = await AsyncStorage.getItem("Member");
    this.setState({ membershipStatus: m, isLoading: true });
    try {
      console.log("sending Request");
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch("https://www.gorporbyken.com/api/exam", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`
        }
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success.length) {
        this.setState(state => ({
          ...state,
          exams: responseJson.success,
          isLoading: false
        }));
      }
    } catch (error) {
      console.log("errorrrrrrrr", error);
      alert("There is some issue with network. Try later!");
      this.props.navigation.navigate("Dashboard");
    }
  }

  render() {
    const {
      state: { exams }
    } = this;
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
        <View style={styles.body}>
          {exams && (
            <Swiper>
              {exams &&
                exams.map((object, index) => {
                  console.log(object);
                  console.log(
                    moment(`${object.start_date} ${object.start_time}`).diff(
                      moment()
                    )
                  );
                  return (
                    <View key={index} style={{ flex: 1 }}>
                      <View style={styles.titleView}>
                        <Text style={styles.title}>{object.name}</Text>
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.text}>
                          Round For {`${object.name}\n`}
                        </Text>
                        <Text style={styles.text}>
                          {`Date: ${new Date(object.start_date)}\nStart Time: ${
                            object.start_time
                          }\nEnd Time:${object.end_time}\n`}
                        </Text>
                      </View>
                      <View style={styles.buttonView}>
                        {object.booking ? (
                          moment(
                            `${object.start_date} ${object.start_time}`
                          ).diff(moment()) > 0 ? (
                            <Button
                              style={styles.button}
                              onPress={() => {
                                {
                                  Alert.alert("Exam", "Exam not started yet");
                                }
                              }}
                            >
                              <Text style={styles.buttonText}>
                                <TimerCountdown
                                  initialMilliseconds={moment(
                                    `${object.start_date} ${object.start_time}`
                                  ).diff(moment())}
                                  formatMilliseconds={milliseconds => {
                                    const remainingSec = Math.round(
                                      milliseconds / 1000
                                    );
                                    const seconds = parseInt(
                                      (remainingSec % 60).toString(),
                                      10
                                    );
                                    const minutes = parseInt(
                                      ((remainingSec / 60) % 60).toString(),
                                      10
                                    );
                                    const hours = parseInt(
                                      (remainingSec / 3600).toString(),
                                      10
                                    );
                                    const s =
                                      seconds < 10 ? "0" + seconds : seconds;
                                    const m =
                                      minutes < 10 ? "0" + minutes : minutes;
                                    let h = hours < 10 ? "0" + hours : hours;
                                    h = h === "00" ? "" : h + ":";
                                    return h + m + ":" + s;
                                  }}
                                  allowFontScaling={true}
                                />
                              </Text>
                            </Button>
                          ) : moment(
                              `${object.start_date} ${object.end_time}`
                            ).diff(moment()) > 0 ? (
                            <Button
                              style={styles.button}
                              onPress={() => {
                                this.props.navigation.navigate("BeforeExam", {
                                  exam: object
                                });
                              }}
                            >
                              <Text style={styles.buttonText}>Start Exam</Text>
                            </Button>
                          ) : (
                            <Button
                              style={styles.button}
                              onPress={() => alert("This Exam is finished")}
                            >
                              <Text style={styles.buttonText}>
                                Exam Finished
                              </Text>
                            </Button>
                          )
                        ) : (
                          <Button
                            style={[styles.button, { backgroundColor: "grey" }]}
                            onPress={() => {
                              if (
                                object.paid == 1 &&
                                this.state.membershipStatus != 1
                              ) {
                                alert(
                                  "This is a premium lecture. To buy a premium account proceed to Profile -> Membership."
                                );
                              } else {
                                this.props.navigation.navigate("Level", {
                                  exam: object
                                });
                              }
                            }}
                          >
                            <Text
                              style={[styles.buttonText, { color: "black" }]}
                            >
                              Book Exam
                            </Text>
                          </Button>
                        )}
                      </View>
                      <View style={styles.buttonView} />
                    </View>
                  );
                })}
            </Swiper>
          )}
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
