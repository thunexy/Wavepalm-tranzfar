import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import {COLOR} from "../Colors/Colors";

export class EnrollPasscode extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={{ width: 200 }}
          resizeMode="contain"
          source={require("../assets/logo.png")}
        />
      </View>
    ),
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon
          color="#000"
          name="md-menu"
          size={30}
          style={{ marginLeft: 24, marginRight: 24 }}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <View
        color="#000"
        name="md-menu"
        size={30}
        style={{ marginLeft: 24, marginRight: 24 }}
      />
    )
  });
  state = {
    passcode: "",
    confirmPasscode: ""
  };

  enrollPasscode = async () => {
    if (this.state.passcode === this.state.confirmPasscode) {
      this.props.submitPasscode(this.state.passcode);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Header headerText="Enroll Passcode" icon="md-lock" riderText="Enter your 4-digit code for quick logon" />
          <TextInput
            style={styles.inputBox}
            onChangeText={passcode => this.setState({ passcode })}
            value={this.state.passcode}
            placeholder="Enter Passcode"
            placeholderTextColor="rgb(207, 205, 205)"
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={confirmPasscode => this.setState({ confirmPasscode })}
            value={this.state.confirmPasscode}
            placeholder="Confirm Passcode"
            placeholderTextColor="rgb(207, 205, 205)"
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={this.enrollPasscode} style={[styles.button, {marginTop: 30}]}>
            <Text style={styles.buttonText}> Enroll </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  footer: {
    marginTop: 16,
    marginBottom: 10
  },
  inputBox: {
    borderBottomWidth: 2,
    borderBottomColor: COLOR.InputGreyBorderColor,
    paddingHorizontal: 16,
    fontSize: 16
  },
  button: {
    margin: "auto",
    alignSelf: "center",
    marginVertical: 10,
    width: "70%",
    backgroundColor: COLOR.AppBlueColor,
    borderRadius: 25,
    paddingVertical: 12
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff"
  }
});

export default EnrollPasscode;
