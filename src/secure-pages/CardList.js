import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import { COLOR } from "./../Colors/Colors";
import Card from "./../components/common/Card";
import PaymentModal from "../components/common/PaymentModal";
import ProgressModal from "../components/common/ProgressModal";
import {airtimePaymentUrl} from "../components/Urls/Urls";

const { width, height } = Dimensions.get("window");
const formatAccNum = num => {
  return `XXXX XXXX XXXX ${num.slice(num.length - 4)}`;
};
const allCards = [
  {
    id: 1,
    bankName: "GT Bank",
    accountNumber: "2345456784847594",
    expiryDate: "MM/YY",
    cvv: "XXX",
    accountName: "JOHN DOE"
  }
  // {
  //   id: 2,
  //   bankName: "First Bank",
  //   accountNumber: "1234567891234234",
  //   expiryDate: "MM/YY",
  //   cvv: "XXX",
  //   accountName: "MARY JANE"
  // }
];

class CardList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
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
    };
  };

  state = {
    showModal: false,
    isProgressModalVisible: false,
    modalText: "",
    paymentModalText: ""
  };

  processPayment = async () => {
    const { details } = this.props.navigation.state.params;
    let countryShort;
    let formattedNumber;
    details.selectedCountry === "Nigeria"
      ? (countryShort = "NG")
      : (countryShort = "GH");
    details.selectedCountry === "Nigeria"
      ? (formattedNumber = "+" + +234 + details.phoneNumber.slice(1))
      : (formattedNumber = "+" + +233 + details.phoneNumber.slice(1));
    // console.log(formattedNumber, countryShort);
    if (details.transactionType === "AIRTIME") {
      try {
        this.setState({
          modalText: "Processing payment...",
          isProgressModalVisible: true,
          showModal: false
        });
        const response = await fetch(
          airtimePaymentUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              secret_key: "FLWSECK-0ff1e91399e04404d10c860ece88c6b9-X",
              service: "fly_buy",
              service_method: "post",
              service_version: "v1",
              service_channel: "rave",
              service_payload: {
                Country: countryShort,
                CustomerId: formattedNumber,
                // Reference: "9300049404444",
                Amount: details.airtimeAmount,
                RecurringType: 0,
                IsAirtime: true,
                BillerName: "AIRTIME"
              }
            })
          }
        );
        const responseJson = await response.json();
        console.log(responseJson);
        this.setState(state => {
          return {
            isProgressModalVisible: false
          };
        });
        if (responseJson.status === "success") {
          if (responseJson.data.Status === "fail") {
            alert(JSON.stringify(responseJson.data.Message));
          } else {
            this.setState(state => {
              return {
                isProgressModalVisible: false,
                showModal: true
              };
            });
          }
        } else {
          alert("Failed");
        }
      } catch (error) {
        this.setState(state => {
          return {
            isProgressModalVisible: false,
            showModal: false
          };
        });
        alert("something went wrong");
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { details } = this.props.navigation.state.params;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <ProgressModal
              isVisible={this.state.isProgressModalVisible}
              text={this.state.modalText}
            />
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
            <Header
              icon="md-calculator"
              backButtonAction={"Buyairtime"}
              replace={true}
              navigation={this.props.navigation}
              headerText="Process Transfer"
            />

            <Text
              style={{
                width: "90%",
                marginTop: 10,
                fontSize: 18,
                fontWeight: "800"
              }}
            >
              Select a Card
            </Text>

            {allCards.map(card => (
              <Card
                key={card.id}
                bankName={card.bankName}
                accountNumber={formatAccNum(card.accountNumber)}
                expiryDate={card.expiryDate}
                cvv={card.cvv}
                accountName={card.accountName}
                onPress={() => this.processPayment()}
              />
            ))}

            {allCards.length <= 1 ? (
              <View
                style={{
                  marginTop: 10,
                  height: 150,
                  width: "90%",
                  backgroundColor: COLOR.InputGreyBorderColor
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddCard", {
                      buttonType: "AddCard"
                    })
                  }
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: COLOR.AppBlueColor,
                    borderStyle: "dotted",
                    borderRadius: 5
                  }}
                >
                  <Icon
                    name="md-add-circle"
                    color={COLOR.AppBlueColor}
                    size={30}
                  />
                  <Text>Add Card</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate("AddCard", {
                  buttonType: "PayDirectly",
                  details: details
                })
              }
            >
              <Text style={styles.buttonText}> Pay Directly</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    alignItems: "center"
  },
  footer: {
    backgroundColor: "#fff"
  },
  buttonContainer: {
    width: 240,
    backgroundColor: COLOR.AppBlueColor,
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 4,
    width: "80%",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 24
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});

export default CardList;
