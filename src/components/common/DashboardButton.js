import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const DashboardButton = ({ title, iconName, style, onPress }) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <View style={style}>
        <Icon name={iconName} color="#1f6a7a" size={30} />
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardButton;
