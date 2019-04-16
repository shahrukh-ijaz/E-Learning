import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  textView: {
    borderWidth: 1,
    flex: 2,
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  titleView: {
    flex: 1,
    margin: 10,
    backgroundColor: "#012060",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  body: {
    flex: 7,
    borderWidth: 1,
    margin: 10,
    paddingTop: 15,
    paddingLeft: 30
  },
  bodyHeading: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 10
  },
  checkBox: {
    margin: 10,
    backgroundColor: "#a09d97",
    fontSize: 18
  }
});