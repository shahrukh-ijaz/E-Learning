import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Signup from "../components/views/signup";
import Signin from "../components/views/signin";
import Dashboard from "../components/views/dashboard";
import OnlineLesson from "../components/views/onlineLesson";
import BookingETest from "../components/views/bookingETest";
import Level from "../components/views/level";
import AfterLevel from "../components/views/afterLevel";
import Exam from "../components/views/Exam";
import Quiz from "../components/views/Quiz";
import TakeQuiz from "../components/views/TakeQuiz";
import CustomFooter from "../components/customComponents/footer";
import Header from "../components/customComponents/header";
import LessonVideo from "../components/views/lessonVideo";
import Profile from "../components/views/Profile";
import ChangePassword from "../components/views/ChangePassword";
import LiveExam from "../components/views/LiveExam";
import BeforeExam from "../components/views/BeforeExam";

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
    }
  },
  {
    initialRouteName: "Signin"
  }
);

const AppStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    LessonVideo: {
      screen: LessonVideo,
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
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        header: null
      }
    },
    Exam: {
      screen: Exam,
      navigationOptions: {
        header: null
      }
    },
    LiveExam: {
      screen: LiveExam,
      navigationOptions: {
        header: null
      }
    },
    TakeQuiz: {
      screen: TakeQuiz,
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
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
    BeforeExam: {
      screen: BeforeExam,
      navigationOptions: {
        header: null
      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Dashboard"
  }
);

const MyNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: "Auth"
  }
);

export default createAppContainer(MyNavigator);
