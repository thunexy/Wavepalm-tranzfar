import React from 'react';
import {Linking, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {URL} from "../../pages/index";

const footer = ({color}) => {
    return (
        <View style={{paddingBottom: 5}}>
            <View style={styles.termsContainer}>
                <TouchableOpacity onPress={()=> Linking.openURL(URL.terms)}><Text style={styles.termsStyle}>Terms of Use</Text></TouchableOpacity>
                <Text style={styles.termsStyle}> | </Text>
                <TouchableOpacity onPress={()=> Linking.openURL(URL.policy)}><Text style={styles.termsStyle}>Privacy Policy</Text></TouchableOpacity>
                <Text style={styles.termsStyle}> | </Text>
                <TouchableOpacity onPress={()=> Linking.openURL(URL.conditions)}><Text style={styles.termsStyle}>Terms & Conditions</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <Text style={[styles.footNote, {color: color}]}>Tranzfar is registered by the Financial Conduct Authority
                    (FCA)</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    termsContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    termsStyle: {
        fontSize: 13,
        color: "#49add3"
    },
    footNote: {
        fontSize: 12
    }
});

export default footer;