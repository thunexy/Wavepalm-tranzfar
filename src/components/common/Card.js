import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { COLOR } from "../../Colors/Colors";

const { width, height } = Dimensions.get("window");

const Card = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginTop: 7,
        width: "90%"
      }}
    >
      <View
        style={{
          backgroundColor: COLOR.AppBlueColor,
          justifyContent: "space-around",
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 6
          // alignItems: "center"
        }}
      >
        <View style={{marginVertical: 10}}>
          <Text style={styles.textWhite}>Bank: {props.bankName}</Text>
        </View>
        <View>
          <Text style={styles.textWhite}>{props.accountNumber}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10 }}>
              <Text style={[styles.textWhite, { fontSize: 10 }]}>VALID </Text>
              <Text style={[styles.textWhite, { fontSize: 10 }]}>THROUGH</Text>
            </View>
            <Text style={styles.textWhite}>{props.expiryDate}</Text>
            <Text style={[styles.textWhite, { fontSize: 9 }]}>CVV</Text>
            <Text style={styles.textWhite}>{props.cvv}</Text>
          </View>

          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity style={styles.radioCircle}>
                <View style={styles.radioCheckedCircle} />
              </TouchableOpacity>
              <Text style={styles.textWhite}>Active</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={styles.textWhite}>{props.accountName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
    paddingHorizontal: 8
  },
  radioButtonContainer: {
    width: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.AppGreenColor,
    alignItems: "center",
    justifyContent: "center"
  },
  radioCheckedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: COLOR.AppGreenColor
  }
});

export default Card;
