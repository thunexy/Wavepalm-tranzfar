import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import TransactionCard from "../components/common/TransactionCard";
import { TextInput } from "react-native-gesture-handler";

const existingGroups = [
  { name: "Oluyole Group", location: "Akure, Nigeria", amount: 500 },
  { name: "Jason Snow", location: "Higejl, India", amount: 2500 },
  { name: "John Mark", location: "Acrra, Ghana", amount: 50000 },
  { name: "John Mark", location: "Acrra, Ghana", amount: 50000 },
  { name: "John Mark", location: "Acrra, Ghana", amount: 50000 },
  { name: "John Mark", location: "Acrra, Ghana", amount: 50000 },
];

class JoinGroupAjoo extends Component {
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
    search: ""
  }

  render() {
    let listOfExistingGroup;
    existingGroups.length
      ? (listOfExistingGroup = existingGroups.map((group, i) => (
          <View key={i} style={{ marginVertical: 3 }}>
            <TransactionCard
              name={group.name}
              subname={group.location}
              amount={group.amount}
            />
          </View>
        )))
      : (listOfExistingGroup = <Text> Loading Members List . . .</Text>);
    return (
      <View style={{ backgroundColor: "white" }}>
        <Header
          icon="md-calculator"
          backButtonAction={"Ajoo"}
          navigation={this.props.navigation}
          headerText="Join Group"
        />

        <View style={{
          marginVertical: 20
        }}>
          <TextInput
          onChangeText={ (search) => this.setState({ search }) }
          value={this.state.search}
          placeholder="Search . . . "
          style={{
            borderBottomWidth: 0.3,
            marginHorizontal: 10,
            height: 35
          }}
          />
        </View>
        <ScrollView>
        {listOfExistingGroup}
        <Footer />
        </ScrollView>
      </View>
    );
  }
}

export default JoinGroupAjoo;
