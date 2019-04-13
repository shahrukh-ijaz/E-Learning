import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  CardItem,
  Title,
  List,
  ListItem,
  SwipeRow
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../../styles/bookingETest.styles";
import Swiper from "react-native-swiper";

export default class BookingETest extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
          <Swiper>
            <View style={{ flex: 1 }}>
              <View style={styles.titleView}>
                <Text style={styles.title}>E-Exam SET 1</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.text}>Round For E-Exam SET 1{"\n"}</Text>
                <Text style={styles.text}>
                  Date: 25th may 2019{"\n"}Round 1: 9:00-11:50{"\n"}Round 2:
                  13:00-15:50{"\n"}
                </Text>
                <Text style={styles.text}>
                  Date: 26th may 2019{"\n"}Round 1: 9:00-11:50{"\n"}Round 2:
                  13:00-15:50{"\n"}
                </Text>
                <Text style={styles.text}>
                  Details:{"\n"}Part 1: xxxxxxx 120 min{"\n"}Part 2: xxxxxx 40
                  min{"\n"}
                </Text>
              </View>
              <View style={styles.buttonView}>
                <Button
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("Level")}
                >
                  <Text style={styles.buttonText}>Booking</Text>
                </Button>
              </View>
              <View style={styles.buttonView} />
            </View>

            <View style={{ flex: 1 }} />

            <View style={{ flex: 1 }} />
          </Swiper>
        </View>
      </React.Fragment>
    );
  }
}
