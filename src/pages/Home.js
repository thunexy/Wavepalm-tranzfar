import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Linking,
    ImageBackground,
} from "react-native";
import Logo from "./../assets/logo.png";
import Footer from "./../components/common/footer";
import {COLOR} from "../Colors/Colors";

class Home extends Component {
    render() {
        return (

            <ImageBackground source={require("../assets/home.jpg")} style={styles.container}>
                <View style={{
                    flex: 1, backgroundColor: "#000",
                    alignItems: "center",
                    opacity: 0.5,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0, right: 0, bottom: 0, left: 0,
                }}>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.screenLogo}/>
                </View>

                <View style={styles.messageContainer}>
                    <Text style={{fontSize: 30, color: "#fff", textAlign: "center"}}>Send and receive money across many
                        countries</Text>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <View style={styles.actionButtonView}>
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.actionButton, {backgroundColor: COLOR.AppGreenColor}]}
                                onPress={() => this.props.navigation.navigate("Login")}
                            >
                                <Text style={{color: "#fff"}}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, {borderColor: "#fff"}]}
                                onPress={() => {
                                    this.props.navigation.navigate("Signup");
                                }}
                            >
                                <Text style={{color: "#fff"}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Footer color={"white"}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    screenLogo: {
        width: 300,
        height: 55,
        resizeMode: "contain"
    },
    logoContainer: {
        flex: 3,
        justifyContent: "flex-end"
    },
    messageContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    actionButtonsContainer: {
        flex: 3,
        justifyContent: "flex-end"
    },

    actionButtonView: {
        flexDirection: "column",
        marginBottom: 40
    },
    actionButton: {
        color: "#000",
        paddingVertical: 10,
        width: "100%",
        borderColor: "#4da652",
        borderWidth: 1.5,
        borderRadius: 4,
        fontSize: 16,
        marginBottom: 10,
        alignItems: "center"
    }
});

export default Home;
