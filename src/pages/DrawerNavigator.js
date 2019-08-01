import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import {connect} from "react-redux";

class DrawerNavigator extends Component {
  navigateToScreen = routeName => () => {
    const navigationAction = NavigationActions.navigate({ routeName });
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    let drawerList = (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.navigateToScreen("Home")}
          style={styles.navView}
        >
          <Text
            style={[
              styles.navText,
              this.props.activeItemKey === "Home" ? styles.activeLink : null
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigateToScreen("Estimate")}
          style={styles.navView}
        >
          <Text
            style={[
              styles.navText,
              this.props.activeItemKey === "Estimate" ? styles.activeLink : null
            ]}
          >
            Estimate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigateToScreen("Signup")}
          style={styles.navView}
        >
          <Text
            style={[
              styles.navText,
              this.props.activeItemKey === "Signup" ? styles.activeLink : null
            ]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.navigateToScreen("Login")}
          style={styles.navView}
        >
          <Text
            style={[
              styles.navText,
              this.props.activeItemKey === "Login" ? styles.activeLink : null
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
    if (this.props.isLoggedIn) {
      drawerList = (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={this.navigateToScreen("Dashboard")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "Dashboard"
                  ? styles.activeLink
                  : null
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateToScreen("SendMoneyEstimate")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "SendMoney"
                  ? styles.activeLink
                  : null
              ]}
            >
              Send Money
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateToScreen("ReceiveMoneyEstimate")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "ReceiveMoney"
                  ? styles.activeLink
                  : null
              ]}
            >
              Receive Money
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateToScreen("Buyairtime")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "Buyairtime"
                  ? styles.activeLink
                  : null
              ]}
            >
              Purchase Airtime
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateToScreen("Profile")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "Profile"
                  ? styles.activeLink
                  : null
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.navigateToScreen("History")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "History"
                  ? styles.activeLink
                  : null
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>alert("Use the logout button available on the home screen for now")}
            style={styles.navView}
          >
            <Text
              style={[
                styles.navText,
                this.props.activeItemKey === "Home" ? styles.activeLink : null
              ]}
            >
              Log Out
            </Text>

          </TouchableOpacity>
        </View>
      );
    }
    return <View>{drawerList}</View>;
  }
}

const styles = StyleSheet.create({
  navView: {
    height: 50,
    paddingHorizontal: 24,
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  navText: {
    fontSize: 20,
    color: "#000"
  },
  activeLink: {
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
};
export default connect(mapStateToProps)(DrawerNavigator);
