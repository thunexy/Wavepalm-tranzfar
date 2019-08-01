import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const SquareButton = ({ text, onPress, iconName, iconType }) => {
  return (
<TouchableOpacity onPress={onPress}  >
    <View  style={styles.buttons}>
      <Icon name={iconName} type={iconType} color="#1f6a7a" />
      <Text onPress={onPress} style={{ textAlign: "center" }}>
        {text}
      </Text>
    </View>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    // flex: 1,
    backgroundColor: "white",
    borderWidth: 1.8,
    borderRadius: 15,
    borderColor: "#4da652",
    borderStyle: "solid",
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10
  }
});

export default SquareButton;
