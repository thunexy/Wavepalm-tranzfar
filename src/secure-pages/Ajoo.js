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

const groupsJoined = [
  {
    name: "First Group",
    status: "active",
    membersCount: "2 members",
    location: "Ibadan"
  },
  {
    name: "First Group",
    status: "active",
    membersCount: "2 members",
    location: "Ibadan"
  }
];

class Ajoo extends Component {
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
    amount: 0.0
  };

  render() {
    const groupList = groupsJoined.map((group, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => this.props.navigation.navigate("AjooGroup")}
      >
        <TransactionCard
          name={group.name}
          subname={group.location}
          amount={group.membersCount}
          subamount={group.status}
        />
      </TouchableOpacity>
    ));

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
              backButtonAction={"Dashboard"}
              navigation={this.props.navigation}
              headerText="Ajoo"
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
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    color: COLOR.AppBlueColor,
                    marginHorizontal: 10,
                    fontSize: 12
                  }}
                >
                  MY GROUP(S)
                </Text>
                {groupList}
              </View>

              <AjooSection
                title="CREATE"
                text="Join new group"
                icon="md-contacts"
                onPress={() => this.props.navigation.navigate("JoinGroupAjoo")}
              />
              <AjooSection
              title="TRANSACTIONS"
              icon="md-contacts"
              text="View Transactions"
              onPress={() => this.props.navigation.navigate("History")}
              />
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

export default Ajoo;
