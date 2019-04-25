import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#012060",
    flex: 6
  },
  header: {
    backgroundColor: "#012060",
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
    borderWidth: 1,
    borderTopColor: "white",

    backgroundColor: "#012060",
    marginTop: 30,
    paddingHorizontal: 10
  },
  inputFields: {
    backgroundColor: "transparent",
    borderRadius: 7,
    margin: 7,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 5,
    height: 50
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
    marginBottom: 30,
    marginHorizontal: 10
  },
  button: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#012060"
  }
});
