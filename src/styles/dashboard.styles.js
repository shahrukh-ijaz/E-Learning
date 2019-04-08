import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  container: {
    flex: 7
  },
  header: {
    flex: 3,
    backgroundColor: "#012060",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  content: {
    marginTop: 30,
    marginHorizontal: 30
  },
  inputFields: {
    borderRadius: 7
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
  surname: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 6
  },
  buttonText: {
    color: "white",
    fontSize: 18
  }
});
