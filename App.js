import React, {Component} from "react";
import {
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";
import {
    Home,
    Login,
    Signup,
    PasswordRecovery,
    Estimate,
    Melissa,
    Verification,
    PasswordChange
} from "./src/pages/index";

import DrawerNavigator from "./src/pages/DrawerNavigator";
import {
    Dashboard,
    Profile,
    History,
    Buyairtime,
    AirtimePayment,
    SendMoneyEstimate,
    ReceiveMoneyEstimate,
    SendPayment,
    EnrollPasscode,
    AddSendMoneyAfricaRecipient,
    AddSendMoneyEuropeRecipient,
    AddReceiveMoneyRecipient,
    CardList,
    AddCard
} from "./src/secure-pages";
import SendMoneyReview from "./src/secure-pages/SendMoneyReview";
import ReceiveMoneyReview from "./src/secure-pages/ReceiveMoneyReview";
import Splash from "./src/pages/Splash";
import {connect} from "react-redux";
import {isLoggedIn} from "./src/store/actions";

class App extends Component {
    render() {
        return !this.props.isLoggedIn ? (
            <AppContainerForGuest/>
        ) : (
            <AppContainerForUser/>
        );
    }
}

const DrawerStackGuest = createDrawerNavigator(
    {
        Home: {screen: Home},
        Estimate: {screen: createStackNavigator({Estimate})},
        Signup: {screen: createStackNavigator({Signup})},
        Login: {
            screen: createStackNavigator({
                Login,
                PasswordRecovery,
                PasswordChange,
                Verification
            })
        }
    },
    {initialRouteName: "Home", contentComponent: DrawerNavigator}
);
const DrawerStackUser = createDrawerNavigator(
    {
        Dashboard: {screen: createStackNavigator({Dashboard})},
        Profile: {screen: createStackNavigator({Profile})},
        History: {screen: createStackNavigator({History})},
        Buyairtime: {screen: createStackNavigator({Buyairtime, AirtimePayment, CardList})},
        CardList: {screen: createStackNavigator({CardList, AddCard})},
        AddCard: {screen: createStackNavigator({AddCard})},
        AirtimePayment: {screen: createStackNavigator({AirtimePayment})},
        SendPayment: {screen: createStackNavigator({SendPayment})},
        EnrollPasscode: {screen: createStackNavigator({EnrollPasscode})},
        SendMoney: {
            screen: createStackNavigator({
                SendMoneyEstimate,
                SendMoneyReview,
                AddSendMoneyAfricaRecipient,
                AddSendMoneyEuropeRecipient,
                AddCard, Dashboard
            })
        },
        ReceiveMoney: {
            screen: createStackNavigator({
                ReceiveMoneyEstimate: ReceiveMoneyEstimate,
                ReceiveMoneyReview,
                AddCard, Dashboard
            })
        },
        LogOut: Home
    },
    {initialRouteName: "Dashboard", contentComponent: DrawerNavigator}
);

const RootStackGuest = createStackNavigator(
    {
        DrawerStack: {screen: DrawerStackGuest},
        Melissa: {screen: createStackNavigator({Melissa})},
        Splash
    },
    {
        initialRouteName: "DrawerStack",
        headerMode: "none"
    }
);
const RootStackUser = createStackNavigator(
    {
        DrawerStack: {screen: DrawerStackUser},
        Melissa: {screen: createStackNavigator({Melissa})},
        Splash
    },
    {
        initialRouteName: "DrawerStack",
        headerMode: "none"
    }
);
const AppContainerForGuest = createAppContainer(RootStackGuest);
const AppContainerForUser = createAppContainer(RootStackUser);

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps)(App);
