import React, { Component } from "react";
import {
  Button
} from "native-base";
import {  Text, View,AsyncStorage } from "react-native";
import { styles } from "../../styles/bookingETest.styles";
import Swiper from "react-native-swiper";

export default class BookingETest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: null
    };
  }
  async componentDidMount(){
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const response = await fetch("https://www.gorporbyken.com/api/exam", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`
        }
      });
      const responseJson = await response.json();
      if(responseJson.success.length){
        this.setState((state) => ({
          ...state,
          exams: responseJson.success
        }))
      }
    }
    catch(error){
      console.log("errorrrrrrrr",error);
    }
  }

  render() {
    const {
      state:{
        exams
      }
    } = this;
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
        <View style={styles.body}>
        {exams && <Swiper>
            {exams && exams.map((object, index) => {
            console.log(object);
            return(
              <View key={index} style={{ flex: 1 }}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>{object.name}</Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.text}>Round For {`${object.name}\n`}</Text>
                  <Text style={styles.text}>
                    {`Date: ${new Date(object.start_date)}\nStart Time: ${object.start_time}\nEnd Time:
                    ${object.end_time}\n`}
                  </Text>
                </View>
                <View style={styles.buttonView}>
                  <Button
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Level",{exam: object})}
                  >
                    <Text style={styles.buttonText}>Booking</Text>
                  </Button>
                </View>
                <View style={styles.buttonView} />
              </View>
            )})}
          </Swiper>}
        </View>
      </React.Fragment>
    );
  }
}
