import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AjooSection from "../components/common/AjooSection";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";

const members = [
  { name: "John Mark", location: "Akure, Nigeria" },
  { name: "Jason Snow", location: "Higejl, India" },
  { name: "John Mark", location: "Akure, Nigeria" },
  { name: "John Mark", location: "Akure, Nigeria" },
  { name: "John Mark", location: "Akure, Nigeria" }
];

class AjooMembers extends Component {
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
    let listOfMembers;
    members.length
      ? (listOfMembers = members.map((member, i) => (
          <View key={i} style={{ marginVertical: 3 }}>
            <AjooSection
              name={member.name}
              location={member.location}
              members={true}
            />
          </View>
        )))
      : (listOfMembers = <Text> Loading Members List . . .</Text>);
    return (
      <View style={{ backgroundColor: "white" }}>
        <Header
          icon="md-calculator"
          backButtonAction={"AjooGroup"}
          navigation={this.props.navigation}
          headerText="Group Members"
        />
        {listOfMembers}
        <Footer />
      </View>
    );
  }
}

export default AjooMembers;
