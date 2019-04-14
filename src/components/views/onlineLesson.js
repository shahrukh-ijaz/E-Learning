import React, { Component, Fragment } from "react";
import { Header, Content, List, ListItem } from "native-base";
import { Text, View, AsyncStorage } from "react-native";
import { styles } from "../../styles/onlineLesson.styles";
import CustomFooter from "../customComponents/footer";

export default class OnlineLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch("https://www.gorporbyken.com/api/lesson", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({})
      });
      const responseJson = await response.json();
      if (responseJson.success.length) {
        this.setState(state => ({
          ...state,
          lessons: responseJson.success
        }));
      }
    } catch (error) {
      console.log("errorrrrrrrr", error);
    }
  }

  render() {
    const {
      state: { lessons }
    } = this;

    return (
      <React.Fragment>
        <Header style={styles.header} />

        <View style={styles.titleView}>
          <Text style={styles.title}>ONLINE LESSONS</Text>
        </View>

        <View style={styles.body}>
          <Content>
            <List>
              <ListItem itemHeader first style={styles.itemHeader}>
                <Text style={styles.itemHeaderText}>Download Document</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.itemText}>Export E-Book</Text>
              </ListItem>
              {lessons &&
                lessons.map((object, index) => (
                  <Fragment key={index}>
                    <ListItem itemHeader style={styles.itemHeader}>
                      <Text style={styles.itemHeaderText}>{object.name}</Text>
                    </ListItem>
                    {object.videos &&
                      object.videos.length &&
                      object.videos[0].map((videoObject, key) => (
                        <ListItem
                          key={key}
                          onPress={() =>
                            this.props.navigation.navigate("LessonVideo", {
                              link: videoObject.link
                            })
                          }
                        >
                          <Text style={styles.itemText}>
                            {videoObject.title}
                          </Text>
                        </ListItem>
                      ))}
                  </Fragment>
                ))}
            </List>
          </Content>
        </View>
        <CustomFooter navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}
