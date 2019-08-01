import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
} from "react-native";
import Logo from "./../assets/logo.png";
import {connect} from "react-redux";

class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.screenLogo}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    screenLogo: {
        width: 300,
        height: 55,
        resizeMode: "contain"
    },
    logoContainer: {
        flex: 3,
        justifyContent: "center"
    },
    messageContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
});


export default Splash;
