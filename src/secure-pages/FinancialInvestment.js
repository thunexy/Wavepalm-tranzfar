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
import InvestCard from "./../components/common/InvestCard";
import { COLOR } from "./../Colors/Colors";

const { width, height } = Dimensions.get("window");

class FinancialInvestment extends Component {
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
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Header
              icon="md-calculator"
              backButtonAction={"Dashboard"}
              navigation={this.props.navigation}
              headerText="Financial Instruments"
            />

            <View>
              <View
                style={{
                  marginHorizontal:10,
                  paddingHorizontal: 5,
                  marginTop: 10,
                  marginBottom: 6,
                  borderRadius: 5,
                  backgroundColor: "rgb(250, 250, 250)",
                  borderWidth: 1,
                  borderColor: "rgba(208, 226, 241, 0.455)"
                }}
              >
                <Text
                  style={{
                    // fontSize: 10,
                    marginHorizontal: 10,
                    paddingVertical: 10
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
                      paddingVertical: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(119, 119, 119, 0.555)"
                      }}
                    >
                      Amount Invested
                    </Text>
                    <Text style={{ textAlign: "center" }}>0</Text>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(119, 119, 119, 0.555)"
                      }}
                    >
                      Account Number
                    </Text>
                    <Text style={{ textAlign: "center" }}>555-5555-555</Text>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 20
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(119, 119, 119, 0.555)"
                      }}
                    >
                      Interest Earned
                    </Text>
                    <Text style={{ textAlign: "center" }}>5%</Text>
                  </View>
                </View>
              </View>
              <InvestCard
                cardTitle="Buy Treasury Bills"
                iconName="md-bulb"
                cardText=" Get real time news updates as they happen around the world"
                //  onPress={() => this.props.navigation.navigate("NewsFeed")}
              />
              <InvestCard
                cardTitle="Sell Treasury Bills"
                iconName="md-bulb"
                cardText=" Get real time news updates as they happen around the world"
                //  onPress={() => this.props.navigation.navigate("NewsFeed")}
                // categories of api
                //
              />
            </View>
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
    backgroundColor: "#fff"
    // alignItems: "center"
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

export default FinancialInvestment;
