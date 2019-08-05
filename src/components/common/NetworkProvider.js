import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLOR } from "../../Colors/Colors";

const getImageSource = type => {
  switch (type) {
    case "mtn":
      return require("../../assets/mtn.png");
    case "9mobile":
      return require("../../assets/9mobile.png");
    case "glo":
      return require("../../assets/glo.png");
    case "airtel":
      return require("../../assets/airtel.png");
    case "vodafone":
      return require("../../assets/vodafone.jpeg");
    case "expresso":
      return require("../../assets/expresso.jpeg");
    case "airteltigo":
      return require("../../assets/airteltigo.jpeg");
    case "mtn-g":
      return require("../../assets/mtn-g.png");
    case "9mobile-g":
      return require("../../assets/9mobile-g.png");
    case "glo-g":
      return require("../../assets/glo-g.png");
    case "airtel-g":
      return require("../../assets/airtel-g.png");
    case "vodafone-g":
      return require("../../assets/vodafone-g.jpg");
    case "airteltigo-g":
      return require("../../assets/airteltigo-g.jpg");
    case "expresso-g":
      return require("../../assets/expresso-g.jpg");
    default:
      return require("../../assets/logo.png");
  }
};

const NetworkProvider = ({ title, logo, focus }) => {
  return (
    <View
      style={[
        styles.container,
        focus && { borderColor: COLOR.AppBlueColor, borderWidth: 2 }
      ]}
    >
      <Image
        source={getImageSource(logo)}
        style={{ height: 24, width: 24, borderRadius: 12 }}
      />
      <Text style={{ fontSize: 12 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 80,
    backgroundColor: "#fff",
    padding: 10,
    marginRight: 8,
      borderWidth: 1,
      borderColor: "#e5e5e5",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default NetworkProvider;
