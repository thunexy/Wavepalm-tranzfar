import React from "react";
import { View, Text, Picker } from "react-native";
import {COLOR} from "../../Colors/Colors";

const Dropdown = ({
  text,
  title,
  width,
  onValueChange,
  items,
  selectedValue,
  line,
  smallHeight
}) => {
  return (
    <View
      style={{
        height: smallHeight ? 30 : "auto",
        width: width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
          paddingHorizontal: 16,
        borderBottomWidth: line ? 1 : 0,
          borderBottomColor: COLOR.InputGreyBorderColor
      }}
    >
      {text && <Text style={{ width: "45%" }}>{title}</Text>}
      <Picker
        selectedValue={selectedValue}
        style={{ flex: 1, height: 42, width: 100 }}
        onValueChange={onValueChange}
      >
        {items.map(item => (
          <Picker.Item key={item.label} label={item.label || item.name} value={item.value || item.name} />
        ))}
      </Picker>
    </View>
  );
};

export default Dropdown;
