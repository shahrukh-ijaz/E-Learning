import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  instructionView: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderWidth: 1,
    padding: 10
  },
  questionView: {
    flex: 6,
    margin: 5,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  },
  button: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    flexDirection: "row",
    marginVertical: 6
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
