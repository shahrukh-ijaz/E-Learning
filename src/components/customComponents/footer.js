import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  Footer,
  FooterTab,
  Icon
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { styles } from "../../styles/components/footer.components.styles";

export default class CustomFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.body} />
        <Container style={styles.footer}>
          <Content />
          <Button
            onPress={() => {}}
            style={{
              alignSelf: "center",
              position: "absolute",
              elevation: 4,
              height: 70,
              width: 70,
              bottom: 0,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 35,
              backgroundColor: "#f5f5f5",
              justifyContent: "center"
            }}
            active
          >
            <Icon active name="add" style={{ color: "darkgrey" }} />
          </Button>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name="apps" />
              </Button>
              <Button>
                <Icon name="camera" />
              </Button>
              <Button style={{ flex: 0, width: 70 }}>
                <Icon active name="navigate" />
              </Button>
              <Button>
                <Icon name="camera" />
              </Button>
              <Button>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </React.Fragment>
    );
  }
}
