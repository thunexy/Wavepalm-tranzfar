import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Picker
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import InvestCard from "./../components/common/InvestCard";
import { COLOR } from "./../Colors/Colors";
import TransactionCard from "../components/common/TransactionCard";
import AjooSection from "../components/common/AjooSection";

const { width, height } = Dimensions.get("window");

class AjooGroup extends Component {
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
    amount: 0.0,
    selectedDate: "",
    date: {
      month: [
        "Select Month - Year",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      year: 2019
    },
    numberOfMembers: 9,
    startMonth: "Jul",
    startYear: 2019
  };

  render() {
    let calMonths = [];
    var firstMonth = this.state.date.month.indexOf(this.state.startMonth);
    for (let i = firstMonth; i < firstMonth + this.state.numberOfMembers; i++) {
      // if(this.state.date.month[i] === "Dec") {
      //   firstMonth = 1
      //  }
      calMonths.push(`${this.state.date.month[i]} ${this.state.startYear}`);
    }
    // monthCalculation()

    const listOfDate = calMonths.map((value, i) => {
      return <Picker.Item key={i} label={value} value={value} />;
    });
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Header
              icon="md-calculator"
              backButtonAction={"Ajoo"}
              navigation={this.props.navigation}
              headerText="Ajoo Group"
            />

            <View>
              <View style={{ backgroundColor: "rgba(18, 132, 226, 0.855)" }}>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 5,
                    marginTop: 10,
                    marginHorizontal: 10,
                    marginBottom: 6,
                    borderRadius: 5,
                    backgroundColor: "rgba(250, 250, 250, 0.4)",
                    borderWidth: 1,
                    borderColor: "rgba(208, 226, 241, 0.455)"
                  }}
                >
                  <Text
                    style={{
                      // fontSize: 10,
                      marginHorizontal: 10,
                      paddingVertical: 5
                    }}
                  >
                    Hello, John
                  </Text>
                  <View
                    style={{
                      marginHorizontal: 10,
                      borderWidth: 0.5,
                      borderColor: "#d0e2f1da"
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "white" }}>
                        Current Balance
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          marginBottom: 10
                        }}
                      >
                        N{this.state.amount}{" "}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "green",
                            justifyContent: "center",
                            marginRight: 15,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            borderRadius: 10
                          }}
                        >
                          <Text style={{ color: "white" }}>Make Payment</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            borderWidth: 1,
                            borderColor: "white",
                            borderRadius: 10,
                            width: 150,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Picker
                            style={{
                              width: "100%",
                              //  color: "#000",
                              borderWidth: 1,
                              borderColor: "red",
                              borderRadius: 10
                            }}
                            selectedValue={this.state.selectedDate}
                            onValueChange={selectedDate =>
                              this.setState({ selectedDate })
                            }
                          >
                            <Picker.Item label="Collection Date" value="" />
                            {listOfDate}
                          </Picker>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
              <Text style={{ color: COLOR.AppBlueColor }}>MEMBERS</Text>
              <AjooSection
                name="Oyebisi Adetoye"
                location="Oyo Nigeria"
                members={true}
                onPress={ () => this.props.navigation.navigate("AjooMembers") }
              />
              </View>
              <AjooSection title="NEW REQUESTS" text="No new request(s)" />
              <AjooSection title="PAYMENT INFORMATION" text="Payment Status" />
              <AjooSection title="TRANSACTIONS" text="View Transactions" />
            </View>
          </View>
          <Footer />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5
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

export default AjooGroup;
