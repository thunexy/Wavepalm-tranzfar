import React, {Component} from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from "./../components/common/footer";
import Header from "./../components/common/header";
import ProgressModal from "../components/common/ProgressModal";
import {passwordChangeUrl} from "../components/Urls/Urls";

const {height} = Dimensions.get("window");

export default class PasswordChange extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <Image
                    style={{width: 200}}
                    resizeMode="contain"
                    source={require("../assets/logo.png")}
                />
            </View>
        ),
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                    color="#000"
                    name="md-menu"
                    size={30}
                    style={{marginLeft: 24, marginRight: 24}}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <View
                color="#000"
                name="md-menu"
                size={30}
                style={{marginLeft: 24, marginRight: 24}}
            />
        )
    });

    state = {
        email: this.props.navigation.getParam("email", ""),
        password: "",
        isProgressModalVisible: false,
        modalText: "",
        cPassword: "",
        authenticationCode: ""
    };
    changePassword = async () => {
        try {
            const state = this.state;
            if (!state.password || !state.cPassword || !state.authenticationCode) {
                alert("Please fill all fields to continue!");
                return;
            }
            if (state.password !== state.cPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (state.password.length < 8) {
                alert("Password must be a minimum of 8 digits");
                return;
            }
            this.setState({modalText: "Changing password...", isProgressModalVisible: true});
            const response = await fetch(`${passwordChangeUrl}?auth=${state.authenticationCode}&email=${this.state.email}&password=${this.state.password}`);
            const responseJson = await response.json();
            this.setState({isProgressModalVisible: false});
            if (!responseJson.bool) {
                alert(responseJson.message);
                return;
            }
            this.props.navigation.navigate("Login");
        }
        catch(e){console.log(e)}
    };

    setDetails = (key, value) => {
        this.setState(state => {
            return {
                ...state,
                [key]: value
            }
        });

    };

    render() {
        return (
            <View style={styles.container}>
                <ProgressModal isVisible={this.state.isProgressModalVisible} text={this.state.modalText}/>
                <Header
                    icon="md-lock"
                    headerText="Log In"
                    riderText="Enter the authentication code sent to your email address"
                />

                <TextInput style={styles.inputField} value={this.state.authenticationCode} onChangeText={this.setDetails(this, "authenticationCode")} keyboardType={"numeric"} placeholder="Authentication code"/>
                <TextInput
                    style={styles.inputField}
                    secureTextEntry={true}
                    placeholder="New Password"
                    value={this.state.password}
                    onChangeText={this.setDetails(this, "password")}
                />
                <TextInput
                    style={styles.inputField}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    value={this.state.cPassword}
                    onChangeText={this.setDetails(this, "cPassword")}
                />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={()=>this.changePassword()}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Footer/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    footer: {
        position: "absolute",
        top: height - 100
    },
    inputField: {
        width: "100%",
        height: 42,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 2,
        paddingLeft: 24,
        paddingRight: 24,
        fontSize: 16
    },
    passcodeText: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        fontSize: 16,
        color: "#49add3"
    },
    buttonContainer: {
        width: 240,
        backgroundColor: "#49add3",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 4,
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 24
    },
    buttonText: {
        color: "#fff",
        fontSize: 16
    }
});
