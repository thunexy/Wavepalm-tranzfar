import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLOR } from "../../Colors/Colors";
import Icon from "react-native-vector-icons/Ionicons";

const AjooSection = props => {
  return props.members ? (
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            backgroundColor: "rgb(250, 250, 250)",
            paddingVertical: 10,
            borderRadius: 10,
            paddingHorizontal: 10
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black" }}>{props.name}</Text>
          <Text style={{ fontSize: 12 }}>{props.location}</Text>
        </View>
      </TouchableOpacity>
  ) : (
    <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
      <Text style={{ color: COLOR.AppBlueColor }}>{props.title}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            backgroundColor: "rgb(250, 250, 250)",
            paddingVertical: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center"

          }}
        >
          <Icon
            name={props.icon}
            color={COLOR.AppBlueColor}
            size={20}
            style={{
              marginRight: 10
            }}
          />
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AjooSection;
