import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const DashboardItem = ({title, desc, onPress, child, arrowRight, icon}) => {
    const childDropdown = (!child) ? (
        <View style={[styles.box]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon
                    name={`ios-${icon}`}
                    color="#1f6a7a"
                    size={44}
                    style={{marginRight: 16}}
                />
                <View style={{width: "75%"}}>
                    <Text style={{fontSize: 16, marginBottom: 4, color: "#00a612"}}>
                        {title}
                    </Text>
                    <Text style={{fontSize: 14}}>{desc}</Text>
                </View>
            </View>
                <View>
                    <Icon
                        style={styles.icon}
                        name={(arrowRight && "md-arrow-dropdown") || "md-arrow-dropright"}
                        color="#a5a5a5"
                        size={30}
                    />
                </View>

        </View>) :  (
        <View style={{paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10, borderRadius: 5, borderColor: "#e1e1e1", backgroundColor: "#f5f5f5", borderWidth: 0.4, flex: 1, marginHorizontal:12}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon
                    name={`ios-${icon}`}
                    color="#00a612"
                    size={24}
                    style={{marginLeft: 10, marginRight: 17}}
                />
                <View style={{width: "80%"}}>
                    <Text style={{fontSize: 14, marginBottom: 3, color: "#00a612"}}>
                        {title}
                    </Text>
                    {desc && ( <Text style={{fontSize: 12}}>{desc}</Text>)}
                </View>
            </View>
        </View>);
    return (
        <TouchableOpacity onPress={onPress}>
            {childDropdown}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 16,
        alignItems: "center",
        paddingVertical: 7,
    },
    icon: {
        marginHorizontal: 16
    }
});

export default DashboardItem;
