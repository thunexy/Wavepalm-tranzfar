import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import TransactionCard from "./../components/common/TransactionCard";
import { COLOR } from "../Colors/Colors";
import PaymentModal from "../components/common/PaymentModal";

const { width, height } = Dimensions.get("window");

class SendPayment extends Component {
  state = {
    showModal: false
  };
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

  processPayment = () => {
    this.setState(state => {
      return {
        ...state,
        showModal: true
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PaymentModal
          isVisible={this.state.showModal}
          goToPage={() => {
            this.setState(state => {
              return {
                ...state,
                showModal: false
              };
            });
            this.props.navigation.navigate("History");
          }}
        />
        <Header icon="md-lock" headerText="Transfer Details" />
        <View style={{ width: "100%", paddingVertical: 10 }}>
          <Text
            style={{
              color: "#49add3",
              paddingVertical: 5,
              paddingHorizontal: 16
            }}
          >
            Sending money to
          </Text>
          <TransactionCard
            name="John Doe"
            subname="Acct Number: 0123456789"
            amount="Change"
            subamount="Nigeria"
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{ color: COLOR.AppBlueColor, marginLeft: 10, fontSize: 12 }}
          >
            Amount
          </Text>
          <TextInput style={styles.inputField} />
        </View>

        <View style={{ width: "100%" }}>
          <Text
            style={{ color: COLOR.AppBlueColor, marginLeft: 10, fontSize: 12 }}
          >
            Reference (Optional)
          </Text>
          <TextInput style={styles.inputField} />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.processPayment()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  footer: {
    position: "absolute",
    top: height - 100
  },
  inputField: {
    width: "100%",
    height: 42,
    borderBottomColor: COLOR.InputGreyBorderColor,
    borderBottomWidth: 2,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 16
  },

  buttonContainer: {
    width: 240,
    backgroundColor: COLOR.AppGreenColor,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 4,
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});

export default SendPayment;
