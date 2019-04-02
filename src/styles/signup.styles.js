import { StyleSheet, Text, View } from "react-native";
import { Left } from "native-base";

export const styles = StyleSheet.create({
  container: {
    flex: 7
  },
  header: {
    flex: 3,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
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
    flexDirection: "row"
  }
});
