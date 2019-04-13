import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Signup from "../components/views/signup";
import Signin from "../components/views/signin";
import Dashboard from "../components/views/dashboard";
import OnlineLesson from "../components/views/onlineLesson";
import BookingETest from "../components/views/bookingETest";
import Level from "../components/views/level";
import AfterLevel from "../components/views/afterLevel";
import CustomFooter from "../components/customComponents/footer";
import Header from "../components/customComponents/header";
// import Profile from "./src/screens/Profile";

const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: Signup,
      navigationOptions: {
        header: null
      }
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        header: null
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    OnlineLesson: {
      screen: OnlineLesson,
      navigationOptions: {
        header: null
      }
    },
    BookingETest: {
      screen: BookingETest,
      navigationOptions: {
        header: null
      }
    },
    Level: {
      screen: Level,
      navigationOptions: {
        header: null
      }
    },
    AfterLevel: {
      screen: AfterLevel,
      navigationOptions: {
        header: null
      }
    },
    Footer: {
      screen: CustomFooter,
      navigationOptions: {
        header: null
      }
    },
    Header: {
      screen: Header,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Dashboard"
  }
);

export default createAppContainer(AuthStack);
