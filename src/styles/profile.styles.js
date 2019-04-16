import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  container: {
    flex: 6
  },
  header: {
    flex: 4,
    paddingTop: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    marginTop: 30,
    marginHorizontal: 30
  },
  inputFields: {
    borderRadius: 7,
    margin: 7
  },
  signupButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#012060",
    marginHorizontal: 4
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 20
  },
  button: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonView: {
    flexDirection: "row"
  }
});
