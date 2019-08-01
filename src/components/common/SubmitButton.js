import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SubmitButton = ({ onPress, color, textColor, title }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: color,
            borderColor: textColor,
              borderRadius: 24,
            borderWidth: 1
          }
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor
            }
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: "auto",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 12,
      width: "80%"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff"
  }
});

export default SubmitButton;
