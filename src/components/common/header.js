import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

const header = (props) => {
    let mainHeader = null;
    let backButton = <View>
        <TouchableOpacity onPress={() => {(props.replace)?props.navigation.replace(props.backButtonAction): props.navigation.navigate(props.backButtonAction)}}>
            <Icon size={30} style={styles.pageHeaderBack} color={"#1f6a7a"} name="ios-arrow-back" />
        </TouchableOpacity>
    </View>;
    if(props.headerText){
        mainHeader = <View style={styles.pageHeader} visible={props.headerText}>
            <View style={styles.pageHeaderRow}>
                {props.backButtonAction && backButton}
                <Icon size={30} style={styles.pageHeaderIcon} color="#1f6a7a" name={props.icon}/>
                <Text style={styles.pageHeaderText}>{props.headerText}</Text>
            </View>
        </View>
    }
    return (
        <View style={{width: "100%"}}>
            {mainHeader}

            {(props.riderText || props.extras) && (
                <View style={styles.rider}>
                    <View style={{flexDirection: "row"}}><Text
                        style={styles.riderText}>{props.riderText}</Text>{props.extras}</View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    pageHeader: {
        height: 42,
        backgroundColor: "#e7e7e7",
        width: "100%",
    },
    pageHeaderRow: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    pageHeaderIcon: {
        marginLeft: 25,
        marginRight: 30
    },
    pageHeaderBack: {
        marginLeft: 25
    },
    pageHeaderText: {
        color: "#000",
        fontSize: 21
    },
    rider: {
        backgroundColor: "#e7e7e7",
        width: "100%",
        marginTop: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    riderText: {
        color: "#000",
        fontSize: 16
    },
});

export default header;