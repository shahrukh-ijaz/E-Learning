import React, { Component } from "react";
import {
  Header,
  Button
} from "native-base";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/afterLevel.styles";
import Swiper from "react-native-swiper";
import { CheckBox } from "react-native-elements";

export default class AfterLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _bookExam = async () => {
    const {
      props:{
        navigation: {
          state: {
            params: {
              exam,
              level
            }
          }
        }
      }
    } = this;

    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const response = await fetch("https://www.gorporbyken.com/api/exam/booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          exam: exam.id,
          level: level
        })
      });
      const responseJson = await response.json();
      console.log('responseJson',responseJson)
    }
    catch(error){
      console.log("errorrrrrrrr",error);
    }
  }


  render() {
    const {
      props:{
        navigation: {
          state: {
            params: {
              exam
            }
          }
        }
      }
    } = this;
    return (
      <React.Fragment>
        <Header style={{ paddingTop: 30, flex: 1 }} />
        <View style={styles.textView}>
          <Text>
            BOOKING E-EXAM{"\n"}Plaese select the E-Exam round{"\n"}Select only
            one round{"\n"}per E-Exam set
          </Text>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{exam.name}</Text>
        </View>
        <View style={styles.body}>
          <Swiper>
            <View style={{ flex: 1 }}>
              <Text style={styles.bodyHeading}>Date: {exam.start_date}</Text>
              <CheckBox
                checked={this.state.checkbox1}
                onPress={() =>
                  this.setState({ checkbox1: !this.state.checkbox1 })
                }
                style={styles.checkBox}
                title={`${exam.start_time} - ${exam.end_time}`}
              />
              <Button
              style={styles.button}
              onPress={this._bookExam}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </Button>
            </View>
          </Swiper>
        </View>
      </React.Fragment>
    );
  }
}
